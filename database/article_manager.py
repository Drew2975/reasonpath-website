"""
ReasonPath Database Manager
Handles all SQLite operations for article management
"""

import sqlite3
import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import re

class ArticleDatabase:
    def __init__(self, db_path: str = "database/reasonpath.db"):
        """Initialize database connection and ensure schema exists."""
        self.db_path = db_path
        self.ensure_database()
    
    def ensure_database(self):
        """Create database and tables if they don't exist."""
        # Create database directory if it doesn't exist
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        
        # Connect and execute schema
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        
        # Read and execute schema file
        schema_path = os.path.join(os.path.dirname(self.db_path), 'schema.sql')
        if os.path.exists(schema_path):
            with open(schema_path, 'r') as f:
                schema = f.read()
                conn.executescript(schema)
        
        conn.commit()
        conn.close()
    
    def get_connection(self):
        """Get a database connection with row factory."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def create_slug(self, title: str) -> str:
        """Generate URL-friendly slug from title."""
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    def calculate_reading_time(self, content: str) -> int:
        """Calculate estimated reading time in minutes."""
        words = len(content.split())
        # Average reading speed: 200-250 words per minute
        return max(1, round(words / 225))
    
    def create_article(self, 
                      title: str,
                      content: str,
                      excerpt: str = None,
                      subtitle: str = None,
                      tags: List[str] = None,
                      categories: List[str] = None,
                      featured: bool = False,
                      ai_sources: List[str] = None,
                      meta_description: str = None,
                      meta_keywords: str = None,
                      status: str = 'draft') -> int:
        """Create a new article and return its ID."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        try:
            # Generate slug
            slug = self.create_slug(title)
            
            # Check if slug exists, append number if needed
            base_slug = slug
            counter = 1
            while True:
                cursor.execute("SELECT id FROM articles WHERE slug = ?", (slug,))
                if not cursor.fetchone():
                    break
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            # Calculate reading time
            reading_time = self.calculate_reading_time(content)
            
            # Prepare AI sources as JSON
            ai_sources_json = json.dumps(ai_sources) if ai_sources else None
            
            # Set published_at if status is published
            published_at = datetime.now() if status == 'published' else None
            
            # Insert article
            cursor.execute("""
                INSERT INTO articles (
                    slug, title, subtitle, excerpt, content, 
                    featured, ai_sources, reading_time,
                    meta_description, meta_keywords, status, published_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (slug, title, subtitle, excerpt, content, 
                  featured, ai_sources_json, reading_time,
                  meta_description, meta_keywords, status, published_at))
            
            article_id = cursor.lastrowid
            
            # Add tags
            if tags:
                for tag_name in tags:
                    tag_slug = self.create_slug(tag_name)
                    # Insert or get tag
                    cursor.execute("""
                        INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)
                    """, (tag_name, tag_slug))
                    
                    cursor.execute("SELECT id FROM tags WHERE slug = ?", (tag_slug,))
                    tag_id = cursor.fetchone()['id']
                    
                    # Link to article
                    cursor.execute("""
                        INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)
                    """, (article_id, tag_id))
            
            # Add categories
            if categories:
                for cat_name in categories:
                    cursor.execute("SELECT id FROM categories WHERE name = ?", (cat_name,))
                    cat = cursor.fetchone()
                    if cat:
                        cursor.execute("""
                            INSERT INTO article_categories (article_id, category_id) 
                            VALUES (?, ?)
                        """, (article_id, cat['id']))
            
            conn.commit()
            return article_id
            
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()
    
    def get_articles(self, 
                    status: str = 'published',
                    limit: int = 10,
                    offset: int = 0,
                    featured_only: bool = False,
                    category: str = None,
                    tag: str = None) -> List[Dict]:
        """Fetch articles with filters."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        query = """
            SELECT DISTINCT a.* FROM articles a
            LEFT JOIN article_categories ac ON a.id = ac.article_id
            LEFT JOIN categories c ON ac.category_id = c.id
            LEFT JOIN article_tags at ON a.id = at.article_id
            LEFT JOIN tags t ON at.tag_id = t.id
            WHERE a.status = ?
        """
        params = [status]
        
        if featured_only:
            query += " AND a.featured = 1"
        
        if category:
            query += " AND c.slug = ?"
            params.append(category)
        
        if tag:
            query += " AND t.slug = ?"
            params.append(tag)
        
        query += " ORDER BY a.published_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        
        cursor.execute(query, params)
        articles = []
        
        for row in cursor.fetchall():
            article = dict(row)
            
            # Get tags for this article
            cursor.execute("""
                SELECT t.name, t.slug FROM tags t
                JOIN article_tags at ON t.id = at.tag_id
                WHERE at.article_id = ?
            """, (article['id'],))
            article['tags'] = [dict(tag) for tag in cursor.fetchall()]
            
            # Get categories
            cursor.execute("""
                SELECT c.name, c.slug FROM categories c
                JOIN article_categories ac ON c.id = ac.category_id
                WHERE ac.article_id = ?
            """, (article['id'],))
            article['categories'] = [dict(cat) for cat in cursor.fetchall()]
            
            # Parse AI sources
            if article['ai_sources']:
                article['ai_sources'] = json.loads(article['ai_sources'])
            
            articles.append(article)
        
        conn.close()
        return articles
    
    def get_article_by_slug(self, slug: str) -> Optional[Dict]:
        """Fetch a single article by its slug."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM articles WHERE slug = ?", (slug,))
        row = cursor.fetchone()
        
        if not row:
            conn.close()
            return None
        
        article = dict(row)
        
        # Increment view count
        cursor.execute("""
            UPDATE articles SET view_count = view_count + 1 WHERE id = ?
        """, (article['id'],))
        
        # Get tags
        cursor.execute("""
            SELECT t.name, t.slug FROM tags t
            JOIN article_tags at ON t.id = at.tag_id
            WHERE at.article_id = ?
        """, (article['id'],))
        article['tags'] = [dict(tag) for tag in cursor.fetchall()]
        
        # Get categories
        cursor.execute("""
            SELECT c.name, c.slug FROM categories c
            JOIN article_categories ac ON c.id = ac.category_id
            WHERE ac.article_id = ?
        """, (article['id'],))
        article['categories'] = [dict(cat) for cat in cursor.fetchall()]
        
        # Parse AI sources
        if article['ai_sources']:
            article['ai_sources'] = json.loads(article['ai_sources'])
        
        conn.commit()
        conn.close()
        return article
    
    def update_article(self, article_id: int, **kwargs) -> bool:
        """Update an existing article."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        try:
            # Build update query
            updates = []
            values = []
            
            allowed_fields = [
                'title', 'subtitle', 'excerpt', 'content', 
                'status', 'featured', 'meta_description', 'meta_keywords'
            ]
            
            for field in allowed_fields:
                if field in kwargs:
                    updates.append(f"{field} = ?")
                    values.append(kwargs[field])
            
            if not updates:
                return False
            
            # Add updated_at
            updates.append("updated_at = CURRENT_TIMESTAMP")
            
            # If status changed to published, set published_at
            if 'status' in kwargs and kwargs['status'] == 'published':
                cursor.execute(
                    "SELECT published_at FROM articles WHERE id = ?", 
                    (article_id,)
                )
                if not cursor.fetchone()['published_at']:
                    updates.append("published_at = CURRENT_TIMESTAMP")
            
            # Execute update
            query = f"UPDATE articles SET {', '.join(updates)} WHERE id = ?"
            values.append(article_id)
            cursor.execute(query, values)
            
            # Update tags if provided
            if 'tags' in kwargs:
                # Remove existing tags
                cursor.execute("DELETE FROM article_tags WHERE article_id = ?", (article_id,))
                
                # Add new tags
                for tag_name in kwargs['tags']:
                    tag_slug = self.create_slug(tag_name)
                    cursor.execute("""
                        INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)
                    """, (tag_name, tag_slug))
                    
                    cursor.execute("SELECT id FROM tags WHERE slug = ?", (tag_slug,))
                    tag_id = cursor.fetchone()['id']
                    
                    cursor.execute("""
                        INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)
                    """, (article_id, tag_id))
            
            conn.commit()
            return True
            
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()
    
    def get_featured_articles(self, limit: int = 3) -> List[Dict]:
        """Get featured articles for homepage."""
        return self.get_articles(featured_only=True, limit=limit)
    
    def get_recent_articles(self, limit: int = 10) -> List[Dict]:
        """Get most recent published articles."""
        return self.get_articles(limit=limit)
    
    def get_articles_by_category(self, category_slug: str, limit: int = 10) -> List[Dict]:
        """Get articles in a specific category."""
        return self.get_articles(category=category_slug, limit=limit)
    
    def get_articles_by_tag(self, tag_slug: str, limit: int = 10) -> List[Dict]:
        """Get articles with a specific tag."""
        return self.get_articles(tag=tag_slug, limit=limit)
    
    def search_articles(self, query: str, limit: int = 20) -> List[Dict]:
        """Search articles by title, excerpt, or content."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM articles 
            WHERE status = 'published' 
            AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)
            ORDER BY published_at DESC
            LIMIT ?
        """, (f'%{query}%', f'%{query}%', f'%{query}%', limit))
        
        articles = []
        for row in cursor.fetchall():
            article = dict(row)
            if article['ai_sources']:
                article['ai_sources'] = json.loads(article['ai_sources'])
            articles.append(article)
        
        conn.close()
        return articles
    
    def get_stats(self) -> Dict:
        """Get database statistics."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        stats = {}
        
        # Total articles
        cursor.execute("SELECT COUNT(*) as count FROM articles")
        stats['total_articles'] = cursor.fetchone()['count']
        
        # Published articles
        cursor.execute("SELECT COUNT(*) as count FROM articles WHERE status = 'published'")
        stats['published_articles'] = cursor.fetchone()['count']
        
        # Draft articles
        cursor.execute("SELECT COUNT(*) as count FROM articles WHERE status = 'draft'")
        stats['draft_articles'] = cursor.fetchone()['count']
        
        # Total views
        cursor.execute("SELECT SUM(view_count) as total FROM articles")
        stats['total_views'] = cursor.fetchone()['total'] or 0
        
        # Total tags
        cursor.execute("SELECT COUNT(*) as count FROM tags")
        stats['total_tags'] = cursor.fetchone()['count']
        
        # Total categories
        cursor.execute("SELECT COUNT(*) as count FROM categories")
        stats['total_categories'] = cursor.fetchone()['count']
        
        conn.close()
        return stats


# Example usage and testing
if __name__ == "__main__":
    db = ArticleDatabase()
    
    # Create a test article
    article_id = db.create_article(
        title="Understanding AI Context Windows: The Memory Challenge",
        subtitle="Why AI models struggle with long conversations",
        excerpt="Context windows are fundamental limitations in AI models that affect how much information they can process at once.",
        content="""
        # Understanding AI Context Windows
        
        AI language models like ChatGPT, Claude, and Gemini all share a fundamental limitation: 
        the context window. This is essentially the model's "working memory" - the amount of text 
        it can consider at any one time when generating a response.
        
        ## What is a Context Window?
        
        Think of a context window like a notepad with limited pages. Once you fill all the pages, 
        you have to start erasing old notes to write new ones. Similarly, when an AI model's 
        context window fills up, it starts "forgetting" earlier parts of the conversation.
        
        ## Current Limitations
        
        - **GPT-4**: 8,000 to 32,000 tokens
        - **Claude 3**: Up to 200,000 tokens
        - **Gemini**: Variable, up to 1 million tokens in some versions
        
        ## Why This Matters
        
        Understanding context windows helps explain why:
        - Long conversations can become inconsistent
        - Models might "forget" instructions given earlier
        - Complex documents might not be fully understood
        
        ## Looking Forward
        
        Researchers are actively working on expanding context windows and developing new 
        architectures that can handle longer sequences more efficiently.
        """,
        tags=["LLM", "AI Safety", "Tutorial", "Beginner"],
        categories=["AI Fundamentals", "Analysis"],
        featured=True,
        ai_sources=["Claude 3.5", "GPT-4", "Gemini Pro"],
        meta_description="Learn about AI context windows and why they limit how much information models can process",
        status="published"
    )
    
    print(f"Created article with ID: {article_id}")
    
    # Get stats
    stats = db.get_stats()
    print(f"\nDatabase Stats: {json.dumps(stats, indent=2)}")
    
    # Get recent articles
    articles = db.get_recent_articles(limit=5)
    print(f"\nRecent articles: {len(articles)}")
    for article in articles:
        print(f"- {article['title']} ({article['slug']})")