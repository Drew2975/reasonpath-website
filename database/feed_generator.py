"""
Homepage Article Feed Generator
Generates HTML for the article feed on the ReasonPath homepage
"""

import os
import sys
from datetime import datetime
from article_manager import ArticleDatabase

def generate_article_card(article):
    """Generate HTML for a single article card."""
    
    # Format the date
    if article['published_at']:
        date = datetime.fromisoformat(article['published_at'])
        formatted_date = date.strftime('%B %d, %Y')
    else:
        formatted_date = 'Draft'
    
    # Generate tag chips
    tag_chips = ''
    if article['tags']:
        for tag in article['tags'][:3]:  # Show max 3 tags
            tag_chips += f'<span class="article-tag">{tag["name"]}</span>'
    
    # Generate category badge
    category_badge = ''
    if article['categories']:
        category_badge = f'<span class="article-category">{article["categories"][0]["name"]}</span>'
    
    # AI sources badge
    ai_badge = ''
    if article['ai_sources']:
        ai_count = len(article['ai_sources'])
        ai_badge = f'<span class="ai-badge" title="Created with {ai_count} AI models">🤖 {ai_count} AIs</span>'
    
    # Featured badge
    featured_badge = ''
    if article['featured']:
        featured_badge = '<span class="featured-badge">⭐ Featured</span>'
    
    return f"""
    <article class="article-card" data-slug="{article['slug']}">
        <div class="article-card-header">
            {category_badge}
            {featured_badge}
            {ai_badge}
        </div>
        <h3 class="article-title">
            <a href="/blog/{article['slug']}.html">{article['title']}</a>
        </h3>
        {f'<p class="article-subtitle">{article["subtitle"]}</p>' if article['subtitle'] else ''}
        <p class="article-excerpt">{article['excerpt'] or article['content'][:200] + '...'}</p>
        <div class="article-tags">
            {tag_chips}
        </div>
        <div class="article-meta">
            <span class="article-date">{formatted_date}</span>
            <span class="article-reading-time">📖 {article['reading_time']} min read</span>
            <span class="article-views">👁 {article['view_count']} views</span>
        </div>
        <a href="/blog/{article['slug']}.html" class="article-link">Read More →</a>
    </article>
    """

def generate_hero_article(article):
    """Generate HTML for the hero/featured article."""
    
    if article['published_at']:
        date = datetime.fromisoformat(article['published_at'])
        formatted_date = date.strftime('%B %d, %Y')
    else:
        formatted_date = 'Draft'
    
    # Generate tag chips
    tag_chips = ''
    if article['tags']:
        for tag in article['tags'][:5]:  # Show more tags for hero
            tag_chips += f'<span class="hero-tag">{tag["name"]}</span>'
    
    return f"""
    <div class="hero-article">
        <div class="hero-article-content">
            <div class="hero-article-category">
                {article['categories'][0]['name'] if article['categories'] else 'Analysis'}
            </div>
            <h2 class="hero-article-title">
                <a href="/blog/{article['slug']}.html">{article['title']}</a>
            </h2>
            {f'<p class="hero-article-subtitle">{article["subtitle"]}</p>' if article['subtitle'] else ''}
            <p class="hero-article-excerpt">{article['excerpt'] or article['content'][:300] + '...'}</p>
            <div class="hero-article-tags">
                {tag_chips}
            </div>
            <div class="hero-article-meta">
                <span class="hero-date">{formatted_date}</span>
                <span class="hero-reading-time">📖 {article['reading_time']} min read</span>
                {f'<span class="hero-ai-sources">🤖 Created with {', '.join(article["ai_sources"])}</span>' if article['ai_sources'] else ''}
            </div>
            <a href="/blog/{article['slug']}.html" class="btn btn-primary">Read Full Analysis →</a>
        </div>
    </div>
    """

def generate_article_feed_html():
    """Generate the complete article feed HTML."""
    
    db = ArticleDatabase()
    
    # Get featured article for hero
    featured = db.get_featured_articles(limit=1)
    
    # Get recent articles
    recent = db.get_recent_articles(limit=9)
    
    # Filter out the featured article from recent if it exists
    if featured:
        recent = [a for a in recent if a['id'] != featured[0]['id']]
    
    html = '<div class="article-feed-container">\n'
    
    # Add hero article if exists
    if featured:
        html += f"""
        <section class="hero-article-section">
            <div class="frame">
                <div class="frame-toolbar">
                    <div class="frame-title">Featured Analysis</div>
                    <div class="frame-actions">
                        <button class="frame-btn" data-action="share">Share</button>
                    </div>
                </div>
                <div class="frame-content">
                    {generate_hero_article(featured[0])}
                </div>
            </div>
        </section>
        """
    
    # Add recent articles grid
    if recent:
        article_cards = '\n'.join([generate_article_card(article) for article in recent[:6]])
        
        html += f"""
        <section class="recent-articles-section">
            <div class="frame">
                <div class="frame-toolbar">
                    <div class="frame-title">Latest Articles</div>
                    <div class="frame-actions">
                        <button class="frame-btn" data-action="filter">Filter</button>
                        <button class="frame-btn" data-action="view-all">View All</button>
                    </div>
                </div>
                <div class="frame-content">
                    <div class="articles-grid">
                        {article_cards}
                    </div>
                </div>
            </div>
        </section>
        """
    
    # Add categories section
    categories_html = """
    <section class="browse-categories-section">
        <div class="frame">
            <div class="frame-toolbar">
                <div class="frame-title">Browse by Category</div>
            </div>
            <div class="frame-content">
                <div class="category-cards">
                    <a href="/category/ai-fundamentals" class="category-card">
                        <div class="category-icon">🎓</div>
                        <h4>AI Fundamentals</h4>
                        <p>Core concepts explained</p>
                    </a>
                    <a href="/category/analysis" class="category-card">
                        <div class="category-icon">🔍</div>
                        <h4>Analysis</h4>
                        <p>In-depth research</p>
                    </a>
                    <a href="/category/tutorials" class="category-card">
                        <div class="category-icon">📚</div>
                        <h4>Tutorials</h4>
                        <p>Step-by-step guides</p>
                    </a>
                    <a href="/category/industry-news" class="category-card">
                        <div class="category-icon">📰</div>
                        <h4>Industry News</h4>
                        <p>Latest developments</p>
                    </a>
                </div>
            </div>
        </div>
    </section>
    """
    
    html += categories_html
    html += '\n</div>'
    
    return html

def generate_article_feed_styles():
    """Generate CSS for the article feed."""
    return """
/* Article Feed Styles */
.article-feed-container {
    margin-top: 2rem;
}

/* Hero Article */
.hero-article {
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 12px;
}

.hero-article-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #E55A00;
    color: white;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.hero-article-title {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 0.75rem;
    color: #00407A;
}

.hero-article-title a {
    color: inherit;
    text-decoration: none;
}

.hero-article-title a:hover {
    text-decoration: underline;
}

.hero-article-subtitle {
    font-size: 1.25rem;
    color: #64748b;
    margin-bottom: 1rem;
    font-style: italic;
}

.hero-article-excerpt {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 1.5rem;
}

.hero-article-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
}

.hero-tag {
    padding: 0.25rem 0.75rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    font-size: 0.875rem;
    color: #64748b;
}

.hero-article-meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #64748b;
}

/* Article Grid */
.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.article-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.article-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.article-card-header {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.article-category {
    padding: 0.2rem 0.6rem;
    background: #00407A;
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.featured-badge {
    padding: 0.2rem 0.6rem;
    background: gold;
    color: #00407A;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.ai-badge {
    padding: 0.2rem 0.6rem;
    background: #f0f9ff;
    color: #0369a1;
    border-radius: 4px;
    font-size: 0.75rem;
}

.article-title {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    color: #00407A;
}

.article-title a {
    color: inherit;
    text-decoration: none;
}

.article-title a:hover {
    text-decoration: underline;
}

.article-subtitle {
    color: #64748b;
    font-style: italic;
    margin-bottom: 0.75rem;
}

.article-excerpt {
    color: #4a5568;
    line-height: 1.5;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.article-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.article-tag {
    padding: 0.15rem 0.5rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.75rem;
    color: #64748b;
}

.article-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 1rem;
}

.article-link {
    color: #E55A00;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
}

.article-link:hover {
    text-decoration: underline;
}

/* Category Cards */
.category-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.category-card {
    padding: 1.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
}

.category-card:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
}

.category-card h4 {
    color: #00407A;
    margin-bottom: 0.5rem;
}

.category-card p {
    color: #64748b;
    font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-article-title {
        font-size: 1.75rem;
    }
    
    .articles-grid {
        grid-template-columns: 1fr;
    }
    
    .category-cards {
        grid-template-columns: repeat(2, 1fr);
    }
}
"""

if __name__ == "__main__":
    # Generate and print the HTML
    html = generate_article_feed_html()
    print("Generated Article Feed HTML:")
    print("=" * 50)
    print(html)
    print("=" * 50)
    
    # Also save the CSS
    css = generate_article_feed_styles()
    css_path = os.path.join(os.path.dirname(__file__), '..', 'assets', 'css', 'article-feed.css')
    os.makedirs(os.path.dirname(css_path), exist_ok=True)
    with open(css_path, 'w') as f:
        f.write(css)
    print(f"\nCSS saved to: {css_path}")