# AI CLI Orchestration Guide

**DISCLAIMER: This is a flexible reference guide, not binding rules. The human makes all final decisions about AI selection and workflow. If you deviate from these recommendations, no arguments - you know your project better than any guide.**

## Quick Decision Trees

### Project Type → Primary AI Selection
- **Frontend/UI Development** → Gemini CLI (structured UI commands, theme generation)
- **Backend Architecture** → Claude Code (methodical planning, safety-first approach)
- **Algorithm/Complex Logic** → Codex CLI (raw problem-solving power, debugging strength)
- **Documentation/Writing** → Claude Code (writing quality, clear explanations)
- **Research/Context Analysis** → Gemini CLI (1M token context window, web search integration)

### Workflow-Specific Decision Trees

#### Debugging Workflows
- **Start with**: Codex CLI (strongest debugging capabilities, root cause analysis)
- **Escalate to**: Claude Code if need systematic investigation across files
- **Bring in**: Gemini CLI if bug spans large codebase context

#### New Feature Development  
- **Planning phase**: Claude Code (architectural thinking, TDD approach)
- **Implementation phase**: Gemini CLI (rapid prototyping, UI focus)
- **Integration phase**: Codex CLI (complex logic, algorithm implementation)

#### Code Refactoring
- **Analysis phase**: Gemini CLI (large context window for system understanding)
- **Refactoring phase**: Claude Code (safe, methodical restructuring)
- **Validation phase**: Codex CLI (performance testing, edge case checking)

#### Performance Optimization
- **Profiling phase**: Codex CLI (identifying bottlenecks, algorithmic analysis)
- **Implementation phase**: Claude Code (careful optimization without breaking functionality)
- **Testing phase**: Gemini CLI (comprehensive testing across system)

#### Legacy Code Maintenance
- **Understanding phase**: Gemini CLI (large context for archaeological analysis)
- **Modernization phase**: Claude Code (safe, incremental updates)
- **Testing phase**: Codex CLI (comprehensive test suite development)

### When to Scale Up (Single AI → Multiple AIs)
- Current AI hits 3 failed attempts OR high token usage (>75% context)
- Context keeps breaking, need frequent re-sync
- Task spans multiple domains (frontend + backend + algorithms)
- Need quality validation on critical/production code
- Time pressure requires parallel work streams

## Failure Redirect Patterns

### Pattern: Resource + Attempt Context
Include both token usage and attempt history when switching AIs after failures.

### Example:
```
"Codex used ~80% of its context across 3 attempts debugging this async function. Same race condition error each time. Here's the error: [paste]. Here's the code: [paste]. Can you try a different approach?"
```

### Adaptation Notes:
- Use actual metrics if CLI displays them (Gemini: "75% context", ChatGPT: "2,400 tokens")
- If no metrics available, estimate: "multiple attempts" or "high token usage"
- Specify what was actually tried, not just "it failed"
- State redirect reason: "different approach," "fresh perspective," "specialized strength"

## Context Handoff Patterns

### Pattern: Role + Context + Constraints
Define the receiving AI's role, provide necessary context, set clear boundaries.

### Example:
```
"Claude, you're now the code reviewer. Gemini just built this login component [paste code]. Review for production readiness but DON'T modify the existing database queries - those are handled elsewhere."
```

### Adaptation Notes:
- Always define the role explicitly: "debugger," "reviewer," "implementer"
- Include work boundaries: what NOT to change
- Reference previous AI's work: "Gemini built," "Codex debugged," "Claude planned"
- Specify deliverables: "just review," "fix and explain," "rewrite from scratch"

## Quality Control Patterns

### Pattern: Verification Request
Use one AI to validate another AI's work with specific criteria.

### Example:
```
"Claude, verify this API design that Codex created. Check for: security issues, error handling, and REST conventions. Code: [paste]. Don't implement, just assess."
```

### Adaptation Notes:
- Define specific validation criteria upfront
- Clarify verification scope: security, performance, style, logic
- Specify output format: "list issues," "rate 1-10," "approve/reject with reasons"
- Make clear this is review-only, not implementation

## Parallel Work Setup

### Pattern: Domain Separation
Divide work by clear functional boundaries to prevent conflicts.

### Example:
```
"Gemini: Handle all frontend components in /src/components. Claude: Design the API routes in /api. Codex: Debug the authentication middleware in /auth. No one touches the database schema - that's locked."
```

### Adaptation Notes:
- Use directory boundaries when possible
- Define shared interfaces/contracts upfront
- Establish "no-touch" zones to prevent conflicts
- Set coordination checkpoints: "merge review at end of day"

## Common Scenarios

### "I'm Short on Time, Need This Done Fast"
- **Primary**: Gemini CLI (speed, rapid prototyping)
- **Backup**: Codex CLI if algorithms get complex
- **Modified checkpoint**: 2 attempts instead of 3

### "This is Production-Critical Code"
- **Primary**: Claude Code (quality, methodical approach)
- **Secondary**: Use other AIs for review/validation
- **Extra step**: Always get second opinion before deployment

### "Learning New Technology/Framework"
- **Primary**: Gemini CLI (context analysis, web search for docs)
- **Secondary**: Claude Code for step-by-step explanations
- **Focus**: Understanding over speed

### "Legacy Codebase Maintenance"
- **Primary**: Gemini CLI (large context for whole-system analysis)
- **Secondary**: Claude Code for careful refactoring
- **Approach**: Understand first, then modify

## Project State Alignment

### Context File Management
**Maintain consistent project understanding across all CLIs:**
- Use CLAUDE.md, GEMINI.md, and AGENTS.md files in project root
- Include: project goals, architecture decisions, coding standards, current status
- Update files when project direction changes significantly

### Alignment Checklist
**When switching between AIs:**
- Verify they're reading from same context files
- Include project status in handoff prompts: "Current: building user auth system"
- Reference shared decisions: "As agreed in the architecture doc..."
- Flag any changes: "Requirements changed - we're now using GraphQL instead of REST"

### Quick Sync Pattern
```
"Project update: We're building [current focus]. Architecture: [key decisions]. Current status: [what's complete]. Your role: [specific task]. Context files are up to date."
```

## Backup/Fallback Strategies

### Usage Limit Fallbacks
**Claude Code hits message limit (~45 msgs/5hrs):**
- **Primary backup**: Gemini CLI (free tier covers most tasks)
- **Secondary backup**: Codex CLI (if you have ChatGPT Plus/Pro)

**Gemini CLI hits daily limit (1000 requests):**
- **Primary backup**: Claude Code (higher per-message capability)
- **Secondary backup**: Codex CLI (usage-based, no daily caps)

**Codex CLI hits ChatGPT limits:**
- **Primary backup**: Gemini CLI (generous free tier)
- **Secondary backup**: Claude Code (different provider, independent limits)

### Service Outage Fallbacks
**Any single service down:**
- Continue with remaining two CLIs
- Adjust workflow phases to match available tools
- Document work in progress for seamless resume

**Multiple services down:**
- Fall back to traditional development
- Use the guide's patterns for human-to-human collaboration
- Resume orchestration when services restore

## Checkpoint System Integration

**Automatic triggers:**
- 3 failed attempts on same issue
- High token usage (>75% context if visible)
- Repeated identical errors
- AI explicitly states limitations
- Usage limit warnings/errors

**Manual triggers:**
- Time pressure requires different approach
- Current AI lacks specialized knowledge
- Need second opinion on important decisions
- Task complexity exceeds current AI's comfort zone
- Service degradation/slow responses

**Action steps:**
1. Document what was attempted
2. Include error messages/context
3. State redirect reason (failure vs limits vs outage)
4. Choose appropriate next AI based on task type AND availability
5. Structure handoff prompt using patterns above