#!/usr/bin/env python
"""
Initialize ReasonPath Database
Run this script to set up the database with initial content
"""

import os
import sys
from article_manager import ArticleDatabase

def initialize_database():
    """Initialize the database with sample content."""
    
    print("Initializing ReasonPath Database...")
    db = ArticleDatabase()
    
    # Check if articles already exist
    stats = db.get_stats()
    if stats['total_articles'] > 0:
        print(f"Database already contains {stats['total_articles']} articles.")
        response = input("Do you want to continue and add more sample content? (y/n): ")
        if response.lower() != 'y':
            print("Initialization cancelled.")
            return
    
    print("\nAdding sample articles...")
    
    # Sample article 1: AI Context
    article1_id = db.create_article(
        title="AI's Next Frontier Isn't Intelligence, It's Context",
        subtitle="Why the most brilliant AI tools are like overwhelmed project managers losing the plot",
        excerpt="The real challenge for AI is no longer about raw intelligence—it's about perfect contextual recall.",
        content="""Here's the thing about AI as we head into the fall of 2025: the most brilliant tools in the world are like overwhelmed project managers.

You've felt this. You spend two hours briefing an AI agent on a complex project, detailing stakeholders, goals, and constraints. It performs brilliantly. The next day, you ask it to draft an email based on 'yesterday's key objectives,' and it returns something generic, having lost the crucial, nuanced details from the middle of your conversation.

This isn't an annoying glitch; it's a pattern that became painfully clear during the big agent rollouts this past summer, revealing the next major race in technology. The real challenge for AI is no longer about raw intelligence—it's about perfect contextual recall.""",
        tags=["AI Context", "Memory", "Claude", "ChatGPT", "Gemini", "Analysis"],
        categories=["Analysis"],
        featured=True,
        ai_sources=["Claude 3.5", "GPT-4", "Gemini Pro"],
        meta_description="Why AI loses context and how the battle for perfect recall will define the next era",
        status="published"
    )
    print(f"✓ Created article: AI's Next Frontier (ID: {article1_id})")
    
    # Sample article 2: Understanding LLMs
    article2_id = db.create_article(
        title="Understanding Large Language Models: A Beginner's Guide",
        subtitle="Breaking down how AI actually 'thinks' without the technical jargon",
        excerpt="LLMs don't actually understand language the way humans do—they're sophisticated pattern-matching machines.",
        content="""Large Language Models (LLMs) like ChatGPT, Claude, and Gemini have become household names, but how do they actually work?

At their core, LLMs are massive neural networks trained on enormous amounts of text data. They learn patterns in language by analyzing billions of examples, developing an intricate understanding of how words and concepts relate to each other.

But here's the crucial point: LLMs don't actually 'understand' language the way humans do. They're sophisticated pattern-matching machines that have learned to predict what words should come next based on context.

Think of it like an incredibly well-read person who has memorized millions of conversations and can cleverly recombine them—but without truly understanding the meaning behind the words.""",
        tags=["LLM", "Tutorial", "Beginner", "AI Fundamentals"],
        categories=["AI Fundamentals", "Tutorials"],
        featured=False,
        ai_sources=["Claude 3.5"],
        meta_description="Learn how Large Language Models work in plain English",
        status="published"
    )
    print(f"✓ Created article: Understanding LLMs (ID: {article2_id})")
    
    # Sample article 3: AI Safety
    article3_id = db.create_article(
        title="The Alignment Problem: Why Teaching AI What We Want Is Harder Than It Seems",
        subtitle="Exploring the challenge of ensuring AI systems pursue intended goals",
        excerpt="The alignment problem isn't just about preventing AI from becoming evil—it's about the subtle ways AI can misinterpret our intentions.",
        content="""The alignment problem is one of the most important challenges in AI development, yet it's often misunderstood.

At its simplest, alignment is about ensuring AI systems do what we actually want them to do. This sounds straightforward, but it's surprisingly complex.

Consider a simple example: You ask an AI to 'make you happy.' A poorly aligned AI might interpret this literally and try to manipulate your brain chemistry directly. A well-aligned AI would understand the implicit constraints and values behind your request.

The challenge becomes exponentially more complex as AI systems become more capable. How do we ensure that powerful AI systems remain aligned with human values when those values themselves are complex, contradictory, and constantly evolving?""",
        tags=["AI Safety", "Alignment", "Ethics", "Advanced"],
        categories=["AI Safety", "Analysis"],
        featured=False,
        ai_sources=["Claude 3.5", "GPT-4"],
        meta_description="Understanding the AI alignment problem and why it matters for the future",
        status="published"
    )
    print(f"✓ Created article: The Alignment Problem (ID: {article3_id})")
    
    # Print final stats
    print("\n" + "="*50)
    stats = db.get_stats()
    print("Database Statistics:")
    print(f"  Total Articles: {stats['total_articles']}")
    print(f"  Published: {stats['published_articles']}")
    print(f"  Drafts: {stats['draft_articles']}")
    print(f"  Total Views: {stats['total_views']}")
    print(f"  Tags: {stats['total_tags']}")
    print(f"  Categories: {stats['total_categories']}")
    print("="*50)
    print("\nDatabase initialization complete!")
    print(f"Database location: {os.path.abspath(db.db_path)}")

if __name__ == "__main__":
    initialize_database()
