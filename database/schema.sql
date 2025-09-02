-- ReasonPath Article Database Schema
-- SQLite database for managing articles, tags, and content

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'ReasonPath Team',
    status TEXT CHECK(status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    featured BOOLEAN DEFAULT 0,
    hero_image TEXT,
    thumbnail_image TEXT,
    reading_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    ai_sources TEXT, -- JSON array of AI models used
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    meta_description TEXT,
    meta_keywords TEXT
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#00407A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Article-Tag relationship table
CREATE TABLE IF NOT EXISTS article_tags (
    article_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Categories table (for main sections)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Article-Category relationship
CREATE TABLE IF NOT EXISTS article_categories (
    article_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Article series/collections
CREATE TABLE IF NOT EXISTS series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    status TEXT CHECK(status IN ('ongoing', 'completed', 'planned')) DEFAULT 'ongoing',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Articles in series
CREATE TABLE IF NOT EXISTS series_articles (
    series_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (series_id, article_id),
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- Analytics/metrics table
CREATE TABLE IF NOT EXISTS article_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    avg_time_on_page INTEGER DEFAULT 0, -- in seconds
    bounce_rate REAL DEFAULT 0.0,
    shares INTEGER DEFAULT 0,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    UNIQUE(article_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_series_slug ON series(slug);

-- Insert default categories
INSERT OR IGNORE INTO categories (name, slug, description, sort_order) VALUES
    ('AI Fundamentals', 'ai-fundamentals', 'Core concepts and basics of artificial intelligence', 1),
    ('Analysis', 'analysis', 'In-depth analysis and research articles', 2),
    ('Industry News', 'industry-news', 'Latest developments in AI', 3),
    ('Tutorials', 'tutorials', 'Step-by-step guides and how-tos', 4),
    ('Opinion', 'opinion', 'Thoughtful perspectives on AI developments', 5),
    ('Research', 'research', 'Academic and technical research coverage', 6);

-- Insert common tags
INSERT OR IGNORE INTO tags (name, slug, description) VALUES
    ('LLM', 'llm', 'Large Language Models'),
    ('GPT', 'gpt', 'Generative Pre-trained Transformers'),
    ('Claude', 'claude', 'Anthropic Claude AI'),
    ('ChatGPT', 'chatgpt', 'OpenAI ChatGPT'),
    ('Gemini', 'gemini', 'Google Gemini'),
    ('AI Safety', 'ai-safety', 'AI alignment and safety topics'),
    ('Machine Learning', 'machine-learning', 'ML algorithms and techniques'),
    ('Neural Networks', 'neural-networks', 'Deep learning architectures'),
    ('NLP', 'nlp', 'Natural Language Processing'),
    ('Computer Vision', 'computer-vision', 'Image and video AI'),
    ('Ethics', 'ethics', 'AI ethics and responsibility'),
    ('Tutorial', 'tutorial', 'Educational content'),
    ('Beginner', 'beginner', 'Suitable for beginners'),
    ('Advanced', 'advanced', 'Advanced technical content'),
    ('News', 'news', 'Industry news and updates');