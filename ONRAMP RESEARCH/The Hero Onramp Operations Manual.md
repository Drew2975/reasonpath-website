

# **The Hero Onramp Operations Manual**

This manual provides a layered, actionable framework for designing, implementing, and optimizing high-converting hero sections. It synthesizes extensive research into a progressively detailed guide, allowing you to start with universal principles and drill down into specific modules as needed.

---

## **Part 1: Quick Start Guide (Executive Synthesis)**

This section covers the non-negotiable principles—the universal truths that all research points to as foundational for an effective hero onramp.

### **The Non-Negotiables**

* **A Single, Primary Call-to-Action (CTA):** Presenting users with multiple, competing choices leads to "analysis paralysis" and lower conversion rates.1 The hero section must guide the user toward one clear, primary goal.1  
* **Clarity Over Creativity in Messaging:** The value proposition must be understood in seconds.5 A headline should be benefit-focused, answering the user's implicit question: "What's in it for me?".1 Vague corporate slogans and abstract imagery are a primary cause of user confusion and high bounce rates.8  
* **Sub-2.5 Second Load Time:** Performance is a critical feature. Users form an opinion in as little as 0.05 seconds 10, and conversion rates drop for every second a page takes to load.11 The hero image is often the largest element on the page and must be aggressively optimized to avoid sabotaging the user experience before it begins.8  
* **Mobile-First Responsive Design:** With a majority of traffic coming from mobile devices, a hero onramp must be fully functional and visually coherent on all screen sizes.14 Critical elements like the headline and CTA must not be cropped or pushed below the fold on smaller screens.16  
* **Authentic, High-Quality Visuals:** The hero visual must be high-resolution and directly relevant to the brand's message.16 Generic stock photos are strongly discouraged as they can make a brand appear faceless and unoriginal, eroding trust.19

---

## **Part 2: Strategic Playbook**

This section provides decision-making frameworks and addresses the critical strategic conflicts that arise when designing a hero onramp.

### **Decision Matrix: Visual Medium**

The choice of visual medium is a trade-off between emotional impact, information clarity, and performance cost.

| Dimension | Static Image | Background Video | Animation (e.g., Lottie) |
| :---- | :---- | :---- | :---- |
| **Emotional Impact** | High | High | Medium |
| **Information Clarity** | Low | Medium | High |
| **Performance Cost** | Low | High | Medium |
| **Distraction Potential** | Low | High | Medium |
| **Ideal Use Case** | Brand-building, lifestyle products 21 | Experiential services, physical products in use 22 | SaaS products, data visualization, explainers 20 |

### **Decision Matrix: Layout Architecture**

The layout determines how users process information and should be chosen based on the primary communication goal.

| Layout Style | Strategic Purpose | Best For | Key Consideration |
| :---- | :---- | :---- | :---- |
| **Asymmetrical** | Creates dynamic tension and a clear visual path.25 | Guiding the user's eye from an image to a CTA; modern, creative brands.26 | Requires careful balancing of "visual weight" to feel intentional, not chaotic.25 |
| **Split-Screen** | Presents two co-equal options or a strong visual/text contrast.29 | E-commerce with distinct categories (e.g., Men/Women); comparing before-and-after.31 | Panels typically stack on mobile, losing the side-by-side effect. A visual link between panels is needed.29 |
| **Isolated Component** | Deconstructs a product to highlight specific features and benefits.35 | Complex SaaS products where showing functionality is key to communicating value.37 | Tells a story of product-led value, moving beyond abstract brand promises.35 |
| **Bento Grid** | Showcases a variety of features or content in a modular, scannable format.35 | Displaying a diverse portfolio, product specs, or multiple value propositions without clutter.38 | The grid provides structure, but varying module sizes creates a dynamic rhythm.38 |

### **Addressing Critical Conflicts**

Different sources offer conflicting advice on key strategic decisions. The correct path depends on your specific brand, audience, and goals.

* **Conflict: Video Backgrounds**  
  * **The Debate:** Some sources strongly advise against video backgrounds, citing severe performance degradation and high distraction potential that harms conversions.21 Others argue they can be used strategically to communicate a "vibe" or feeling for experiential brands where atmosphere is key.22 A third perspective suggests animation is a better middle ground for showing motion without the high performance cost.20  
  * **Recommendation:** Treat video as a high-risk, high-reward tool. **Do not use it** if your value proposition requires users to read and absorb complex information.22 If you do use it, you  
    **must** A/B test it against a static image to prove its positive impact on conversions and adhere to strict technical optimization standards.22  
* **Conflict: Complexity vs. Simplicity**  
  * **The Debate:** One school of thought pushes for visual innovation through complex, immersive experiences like 3D, scrollytelling, and experimental typography to stand out.35 The opposing view argues that the hero section is one of the most abused elements in web design, and simplicity, clarity, and performance should always win over "design vanity".8  
  * **Recommendation:** This is a question of brand alignment and audience expectation. A creative agency or a high-tech brand can justify a more complex, experimental onramp as a demonstration of their capabilities.43 For most businesses, however, a simple, clear, and fast-loading onramp that prioritizes the user's goal will convert more effectively.6  
* **Conflict: Personalization vs. Static Optimization**  
  * **The Debate:** The vast majority of best practices focus on optimizing a single, static hero experience for a target persona. However, an emerging trend is the use of AI-driven tools to create dynamic, personalized onramps that tailor messaging and visuals to individual users in real-time.44  
  * **Recommendation:** Static optimization is the mandatory foundation. A personalized onramp is an advanced strategy that should only be considered after the fundamentals of performance, clarity, and mobile responsiveness are perfected. For most organizations, perfecting the single static experience will yield the highest ROI.

---

## **Part 3: Technical Specifications**

This module provides the technical benchmarks and framework selection guides necessary for a high-performance implementation.

### **Asset Optimization**

* **Image Optimization:**  
  * **Format Strategy:** Use a multi-format approach with the \<picture\> element. Serve **AVIF** for its superior compression, with a fallback to **WebP** for broader support, and a final fallback to **JPEG** for legacy browsers.47  
  * **Compression:** All images must be aggressively compressed to reduce file size without noticeable quality loss.1  
  * **Responsive Sizing:** Use the srcset attribute to provide multiple image sizes, allowing the browser to download the most efficient version for the user's device.2  
* **Video Optimization:**  
  * **File Size:** Keep the total file size under 10MB, with an ideal target of **2-5MB**.49  
  * **Length & Loop:** The video should be **10-30 seconds** long and loop seamlessly.49  
  * **Resolution & Bitrate:** **720p (1280x720)** is sufficient for most use cases. Use a variable bitrate between 1,000-2,500 kbps.49  
  * **Formats:** Provide both **MP4 (H.264)** for universal compatibility and **WebM** for its better compression. List WebM first in the \<source\> tags.51  
  * **Audio:** The audio track must be **removed from the video file itself** to save bandwidth.51  
  * **Fallback:** Always provide an optimized static image as a placeholder that displays while the video loads.49

### **Animation Framework Selection Guide**

| Use Case | Recommended Technology | Rationale & Trade-offs |
| :---- | :---- | :---- |
| **Simple UI State Changes (e.g., button hover)** | **CSS** Transitions/Animations | **Highest performance**, lowest overhead. Ideal for simple, state-based effects tied to transform and opacity.33 |
| **Complex Storytelling (Scrollytelling)** | **GSAP** (JavaScript) | **Powerful timeline control** and robust scroll integration. Framework-agnostic and highly performant.54 |
| **UI Animation in React** | **Framer Motion** (React) | **Excellent developer experience** for React. Declarative syntax makes integration easy. Larger bundle size than GSAP.54 |
| **Animated Vector Illustrations/Icons** | **Lottie** | Decouples animation from code (designers use After Effects). **Small file size** and perfectly scalable.18 |

---

## **Part 4: Trend Watch (2025-2026)**

This section outlines the emerging visual and interactive trends shaping the future of the hero onramp. Use these for inspiration, but always validate against the core principles in Part 1\.

* **Immersive Dimensions (3D/WebGL):** The use of interactive 3D models and scenes to create depth and allow for product exploration in ways 2D cannot.43 This signals a technologically advanced brand but carries a high performance cost.  
* **The Typographic Revolution:** Typography is becoming the primary visual element. This includes **Kinetic Typography** (animated text that moves and transforms) and **Experimental Typography** (distorted, non-linear compositions that prioritize artistic expression).15  
* **UI as Art (Glassmorphism & Claymorphism):** UI elements are being given physical texture. **Glassmorphism** uses a frosted-glass effect for a sleek, futuristic feel, while **Claymorphism** uses soft, inflated shapes with dual shadows for a playful, tactile appearance.62  
* **The AI Co-Designer:** The use of AI text-to-image generators is emerging as a powerful alternative to generic stock photography, allowing for the rapid creation of unique, highly specific visuals that are perfectly tailored to a brand's message.38  
* **Advanced Interactivity:**  
  * **Scrollytelling:** The user's scroll action triggers a sequence of animations and content reveals, turning the onramp into an interactive narrative. Highly effective for data visualization and product tours.35  
  * **Custom Cursors:** The cursor is transformed into a branded, interactive tool. Effects include **magnetic** (pulling towards links), **flashlight** (revealing content), and **particle trails**.41

---

## **Part 5: Implementation Toolkit**

Use these tools to audit existing onramps and guide the development of new ones.

### **Pre-Flight Checklist**

Before starting any new hero section project, confirm the following:

1. **Destination Defined:** Have all stakeholders agreed on the **single primary conversion goal** for this page? 1  
2. **Driver Profiled:** Is there a clear, research-backed **user persona** this onramp is being designed for? 71  
3. **Message Clarified:** Is the core **benefit-driven headline** finalized and unambiguously clear? 1  
4. **Performance Budget Set:** Have we established a strict performance budget (e.g., LCP under 2.5s, total hero assets under 10MB for video or 500KB for image) that cannot be violated? 8  
5. **Mobile Plan Finalized:** Do we have a clear design and content plan for how this onramp will function on a 390px mobile viewport? 8

### **Audit Framework**

Use this framework to score an existing hero onramp and identify areas for optimization.

| Criterion | Signals of a Frictionless On-Ramp | Common On-Ramp Blockages |
| :---- | :---- | :---- |
| **Clarity of Value** | A first-time user can describe the site's purpose in 5 seconds. The headline is benefit-oriented.1 | The headline is abstract corporate jargon (e.g., "Empowering Possibility"). The visual is a generic stock photo.8 |
| **Path to Action** | There is a single, primary CTA that is the most visually prominent element.1 | Multiple CTAs compete for attention. The CTA is hard to find or blends in with the background.2 |
| **Technical Performance** | Largest Contentful Paint (LCP) is under 2.5 seconds. There is no noticeable layout shift (CLS) as elements load.14 | The page takes longer than 3 seconds to load. A large, unoptimized image or video is the primary cause of slow LCP.8 |
| **Responsive Integrity** | Critical elements (headline, CTA) are always visible and easily tappable on mobile.16 | The primary CTA is pushed below the fold on mobile. Text becomes illegible or overlaps with other elements.8 |
| **Accessibility** | All text has sufficient color contrast against the background (passes WCAG AA). The main headline is a proper \<h1\> tag.8 | Text is overlaid on a busy image without a scrim or overlay, failing contrast tests. A background video autoplays with no option to pause.8 |

#### **Works cited**

1. Website Hero Section Best Practices \+ Examples: A Complete Guide, accessed August 24, 2025, [https://prismic.io/blog/website-hero-section](https://prismic.io/blog/website-hero-section)  
2. Does Your Website Make These 10 Mistakes with Hero Images?, accessed August 24, 2025, [https://blog.matthewgove.com/2021/08/27/does-your-website-make-these-10-mistakes-with-hero-images/](https://blog.matthewgove.com/2021/08/27/does-your-website-make-these-10-mistakes-with-hero-images/)  
3. What is the Hero Section on a Website? (Ideas & Examples) \- AWEBCO, accessed August 24, 2025, [https://www.awebco.com/blog/hero-section/](https://www.awebco.com/blog/hero-section/)  
4. Hero Sections That Really Convert | SquarePlanet \- HYPE4.Academy, accessed August 24, 2025, [https://hype4.academy/articles/design/hero-sections-that-really-convert](https://hype4.academy/articles/design/hero-sections-that-really-convert)  
5. The Only 5 Hero Image Best Practices That Matter \- Crazy Egg, accessed August 24, 2025, [https://www.crazyegg.com/blog/hero-image-best-practices/](https://www.crazyegg.com/blog/hero-image-best-practices/)  
6. 10 best hero section examples and what makes them effective \- LogRocket Blog, accessed August 24, 2025, [https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/)  
7. The Hero Section: A Powerful Force in Web Design \- Engenius, accessed August 24, 2025, [https://engeniusweb.com/the-hero-section-a-powerful-force-in-web-design/](https://engeniusweb.com/the-hero-section-a-powerful-force-in-web-design/)  
8. Stop Using Hero Images\! They're Killing Your UX, accessed August 24, 2025, [https://webdesignerdepot.com/stop-using-hero-images-theyre-killing-your-ux/](https://webdesignerdepot.com/stop-using-hero-images-theyre-killing-your-ux/)  
9. Why does every website throw a pointless image in the hero section? : r/marketing \- Reddit, accessed August 24, 2025, [https://www.reddit.com/r/marketing/comments/1knam0u/why\_does\_every\_website\_throw\_a\_pointless\_image\_in/](https://www.reddit.com/r/marketing/comments/1knam0u/why_does_every_website_throw_a_pointless_image_in/)  
10. The Evolution of Hero Images in Web Design \- Tic Creative, accessed August 24, 2025, [https://www.ticcreative.co.uk/the-hero-image-in-website-design-a-journey-from-zero-to-hero/](https://www.ticcreative.co.uk/the-hero-image-in-website-design-a-journey-from-zero-to-hero/)  
11. Pros and cons of using video as the hero image on the homepage of a website, accessed August 24, 2025, [https://trevellyan.biz/pros-and-cons-of-using-video-as-the-hero-image-on-the-homepage-of-a-website/](https://trevellyan.biz/pros-and-cons-of-using-video-as-the-hero-image-on-the-homepage-of-a-website/)  
12. What are the benefits of having a hero with video background? \- User Experience Stack Exchange, accessed August 24, 2025, [https://ux.stackexchange.com/questions/131168/what-are-the-benefits-of-having-a-hero-with-video-background](https://ux.stackexchange.com/questions/131168/what-are-the-benefits-of-having-a-hero-with-video-background)  
13. Mailchimp: Marketing, Automation & Email Platform, accessed August 24, 2025, [https://mailchimp.com/](https://mailchimp.com/)  
14. Should I Use a Homepage Hero Slider? \- Blue Frog Marketing, accessed August 24, 2025, [https://www.bluefrogdm.com/blog/homepage-hero-slider-use](https://www.bluefrogdm.com/blog/homepage-hero-slider-use)  
15. What Is Above the Fold? Best Practices \+ Website Examples (2024 ..., accessed August 24, 2025, [https://www.shopify.com/blog/above-the-fold](https://www.shopify.com/blog/above-the-fold)  
16. Best Practices for Hero Images. by Nick Babich \- UX Planet, accessed August 24, 2025, [https://uxplanet.org/best-practices-for-hero-images-eeb234b664d6](https://uxplanet.org/best-practices-for-hero-images-eeb234b664d6)  
17. What Is a Website Hero Image? How To Create One and Best Practices (2024) \- Shopify, accessed August 24, 2025, [https://www.shopify.com/blog/16480796-how-to-create-beautiful-and-persuasive-hero-images-for-your-online-store](https://www.shopify.com/blog/16480796-how-to-create-beautiful-and-persuasive-hero-images-for-your-online-store)  
18. 40 inspiring hero images examples for your websites \- Justinmind, accessed August 24, 2025, [https://www.justinmind.com/blog/inspiring-hero-image-websites/](https://www.justinmind.com/blog/inspiring-hero-image-websites/)  
19. Using Website Hero Images: Best Practices & Tips \- Mailchimp, accessed August 24, 2025, [https://mailchimp.com/resources/website-hero-image/](https://mailchimp.com/resources/website-hero-image/)  
20. Replacing Your Hero Video: A Guide to High-Impact Homepage ..., accessed August 24, 2025, [https://www.contentbeta.com/blog/hero-video/](https://www.contentbeta.com/blog/hero-video/)  
21. Why do image sliders and video backgrounds kill conversions? | Studio 1 Design, accessed August 24, 2025, [https://studio1design.com/why-do-image-sliders-and-video-backgrounds-kill-conversions/](https://studio1design.com/why-do-image-sliders-and-video-backgrounds-kill-conversions/)  
22. Do Video Backgrounds Help or Hurt Conversions? \- Unbounce, accessed August 24, 2025, [https://unbounce.com/landing-pages/do-video-backgrounds-help-or-hurt-conversions/](https://unbounce.com/landing-pages/do-video-backgrounds-help-or-hurt-conversions/)  
23. Best Practices and Creative Hero Section Design Ideas for 2025 ..., accessed August 24, 2025, [https://detachless.com/blog/hero-section-web-design-ideas](https://detachless.com/blog/hero-section-web-design-ideas)  
24. The Vertical Split Screen Design Trend \- Website Magazine, accessed August 24, 2025, [https://www.websitemagazine.com/web-design/slicing-dicing-the-split-stacked-screens-trend](https://www.websitemagazine.com/web-design/slicing-dicing-the-split-stacked-screens-trend)  
25. Hero Images \- Author Tools | NSF \- National Science Foundation, accessed August 24, 2025, [https://www.nsf.gov/author-tools/components/hero-images](https://www.nsf.gov/author-tools/components/hero-images)  
26. Best Practices for Using Asymmetrical Layouts \- PixelFreeStudio Blog, accessed August 24, 2025, [https://blog.pixelfreestudio.com/best-practices-for-using-asymmetrical-layouts/](https://blog.pixelfreestudio.com/best-practices-for-using-asymmetrical-layouts/)  
27. The Rise of Asymmetrical Layouts in Design \- Number Analytics, accessed August 24, 2025, [https://www.numberanalytics.com/blog/rise-of-asymmetrical-layouts](https://www.numberanalytics.com/blog/rise-of-asymmetrical-layouts)  
28. Symmetry vs. Asymmetry Difference in Layout Design \- Shopify, accessed August 24, 2025, [https://www.shopify.com/partners/blog/asymmetrical-design](https://www.shopify.com/partners/blog/asymmetrical-design)  
29. Split Screen Web Design: What to Know | Alpha Efficiency.™, accessed August 24, 2025, [https://alphaefficiency.com/split-screen-web-design](https://alphaefficiency.com/split-screen-web-design)  
30. The Art of Split-Screen Design \- Number Analytics, accessed August 24, 2025, [https://www.numberanalytics.com/blog/the-art-of-split-screen-design](https://www.numberanalytics.com/blog/the-art-of-split-screen-design)  
31. Why You Should Not Use Image Sliders in 2025 | SEO Blog \- Blue Media, accessed August 24, 2025, [https://www.gobluemedia.com/blog/image-sliders-seo/](https://www.gobluemedia.com/blog/image-sliders-seo/)  
32. Hero image for posts with AI? : r/3Dprinting \- Reddit, accessed August 24, 2025, [https://www.reddit.com/r/3Dprinting/comments/1mvkyex/hero\_image\_for\_posts\_with\_ai/](https://www.reddit.com/r/3Dprinting/comments/1mvkyex/hero_image_for_posts_with_ai/)  
33. Creating three sections with split screen web design \- Pumpkin Web Design Manchester, accessed August 24, 2025, [https://www.pumpkinwebdesign.com/web-design-manchester/creating-three-sections-with-split-screen-web-design/](https://www.pumpkinwebdesign.com/web-design-manchester/creating-three-sections-with-split-screen-web-design/)  
34. 10 Kinetic Typography Examples \[+ Patterns & How To\] \- Digital Silk, accessed August 24, 2025, [https://www.digitalsilk.com/digital-trends/kinetic-typography/](https://www.digitalsilk.com/digital-trends/kinetic-typography/)  
35. 2024 Design Trends | 5 Must Try Hero Layouts \- DesignerUp, accessed August 24, 2025, [https://designerup.co/blog/2024-design-trends-5-must-try-hero-layouts/](https://designerup.co/blog/2024-design-trends-5-must-try-hero-layouts/)  
36. Isolated component design trend\! \#webdesign \- YouTube, accessed August 24, 2025, [https://m.youtube.com/shorts/xoTbfAqlt7U](https://m.youtube.com/shorts/xoTbfAqlt7U)  
37. I tried to redesign notion hero section considering previous feedbacks these time i didn't just copy the texts I tried to replace them with better creating whole new experience going with minimal design only but slightly change the background ground color to grey & white radial gradient : r/FigmaDesign \- Reddit, accessed August 24, 2025, [https://www.reddit.com/r/FigmaDesign/comments/1iuwquu/i\_tried\_to\_redesign\_notion\_hero\_section/](https://www.reddit.com/r/FigmaDesign/comments/1iuwquu/i_tried_to_redesign_notion_hero_section/)  
38. Best Bento Grid Design Examples \[2025\] \- Mockuuups Studio, accessed August 24, 2025, [https://mockuuups.studio/blog/post/best-bento-grid-design-examples/](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/)  
39. Glassmorphism vs. Claymorphism vs. Skeuomorphism: 2025 UI ..., accessed August 24, 2025, [https://medium.com/design-bootcamp/glassmorphism-vs-claymorphism-vs-skeuomorphism-2025-ui-design-guide-e639ff73b389](https://medium.com/design-bootcamp/glassmorphism-vs-claymorphism-vs-skeuomorphism-2025-ui-design-guide-e639ff73b389)  
40. 3D Hero Image \- Glance, accessed August 24, 2025, [https://www.glance.fyi/3d-hero-image](https://www.glance.fyi/3d-hero-image)  
41. Best 3D Websites, with 3d Animation and AR \- Noomo Agency, accessed August 24, 2025, [https://noomoagency.com/insights/best-3d-websites-and-immersive-web-experiences-design](https://noomoagency.com/insights/best-3d-websites-and-immersive-web-experiences-design)  
42. 14 Micro-interaction Examples to Enhance UX and Reduce Frustration, accessed August 24, 2025, [https://userpilot.com/blog/micro-interaction-examples/](https://userpilot.com/blog/micro-interaction-examples/)  
43. What Is a Hero Image In Web Design? | Resources \- Elementor, accessed August 24, 2025, [https://elementor.com/resources/glossary/what-is-a-hero-image-in-web-design/](https://elementor.com/resources/glossary/what-is-a-hero-image-in-web-design/)  
44. Step-by-Step Guide to Creating Hero Images with AI Tools ... \- dng.ai, accessed August 24, 2025, [https://dng.ai/step-by-step-guide-to-creating-hero-images-with-ai-tools/](https://dng.ai/step-by-step-guide-to-creating-hero-images-with-ai-tools/)  
45. AI No-Code Hero Section in Framer, accessed August 24, 2025, [https://framer.university/resources/ai-no-code-hero-section-in-framer](https://framer.university/resources/ai-no-code-hero-section-in-framer)  
46. AI web banner generator for captivating headers \- Sivi AI, accessed August 24, 2025, [https://sivi.ai/usecases/website-hero-banner-generator](https://sivi.ai/usecases/website-hero-banner-generator)  
47. wordpress.org, accessed August 24, 2025, [https://wordpress.org/plugins/image-optimization/\#:\~:text=WebP%20and%20AVIF%20are%20modern,original%20backup%20will%20be%20used.](https://wordpress.org/plugins/image-optimization/#:~:text=WebP%20and%20AVIF%20are%20modern,original%20backup%20will%20be%20used.)  
48. AVIF vs WebP: Which Image Format Reigns Supreme in 2025?, accessed August 24, 2025, [https://elementor.com/blog/webp-vs-avif/](https://elementor.com/blog/webp-vs-avif/)  
49. 30 jaw-dropping hero section examples from real websites | Marketer Milk, accessed August 24, 2025, [https://www.marketermilk.com/blog/hero-section-examples](https://www.marketermilk.com/blog/hero-section-examples)  
50. How to Optimize a Silent Background Video for Your Website's Hero ..., accessed August 24, 2025, [https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/](https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/)  
51. Inspiring Hero Section Examples for Modern Websites \- Muffin Group, accessed August 24, 2025, [https://muffingroup.com/blog/hero-section/](https://muffingroup.com/blog/hero-section/)  
52. Multimedia: video \- MDN \- Mozilla, accessed August 24, 2025, [https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Extensions/Performance/video](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/video)  
53. CSS vs. JavaScript Animations: When to Use Each? \- Verpex, accessed August 24, 2025, [https://verpex.com/blog/website-tips/css-vs-javascript-animations-when-to-use-each](https://verpex.com/blog/website-tips/css-vs-javascript-animations-when-to-use-each)  
54. On-ramps, off-ramps and customer experience ROI: CX Mini ..., accessed August 24, 2025, [https://www.julia-ahlfeldt.com/on-ramps-off-ramps-and-customer-experience-roi-cx-mini-masterclass-e23/](https://www.julia-ahlfeldt.com/on-ramps-off-ramps-and-customer-experience-roi-cx-mini-masterclass-e23/)  
55. Hero Images/Carousels \- Usability & Web Accessibility \- Yale University, accessed August 24, 2025, [https://usability.yale.edu/usability-best-practices/hero-imagescarousels](https://usability.yale.edu/usability-best-practices/hero-imagescarousels)  
56. Web Animation for Your React App: Framer Motion vs GSAP ..., accessed August 24, 2025, [https://semaphore.io/blog/react-framer-motion-gsap](https://semaphore.io/blog/react-framer-motion-gsap)  
57. Framer vs GSAP: Which Animation Library Should You Choose? \- Pentaclay, accessed August 24, 2025, [https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose](https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose)  
58. Should I use SVG or CSS animation? : r/web\_design \- Reddit, accessed August 24, 2025, [https://www.reddit.com/r/web\_design/comments/ae76dm/should\_i\_use\_svg\_or\_css\_animation/](https://www.reddit.com/r/web_design/comments/ae76dm/should_i_use_svg_or_css_animation/)  
59. Slanted Experimental Type 3.0 pushes the limits of typography \- Creative Boom, accessed August 24, 2025, [https://www.creativeboom.com/resources/slanted-experimental-type-30-pushes-the-limits-of-typography/](https://www.creativeboom.com/resources/slanted-experimental-type-30-pushes-the-limits-of-typography/)  
60. How is Experimental Typography Transforming Modern Design?, accessed August 24, 2025, [https://think.design/blog/how-is-experimental-typography-transforming-design/](https://think.design/blog/how-is-experimental-typography-transforming-design/)  
61. 10 Experimental Typefaces and How to Use Them \- Wix, accessed August 24, 2025, [https://www.wix.com/studio/blog/experimental-typefaces](https://www.wix.com/studio/blog/experimental-typefaces)  
62. Hero Images in Web Design: When, Why, and How to Use \- Design4Users, accessed August 24, 2025, [https://design4users.com/hero-images-in-web-design/](https://design4users.com/hero-images-in-web-design/)  
63. What is claymorphism in web design? \- LogRocket Blog, accessed August 24, 2025, [https://blog.logrocket.com/ux-design/what-is-claymorphism-web-design/](https://blog.logrocket.com/ux-design/what-is-claymorphism-web-design/)  
64. What Is AI-Generated Art? — updated 2025 | IxDF \- The Interaction Design Foundation, accessed August 24, 2025, [https://www.interaction-design.org/literature/topics/ai-generated-art](https://www.interaction-design.org/literature/topics/ai-generated-art)  
65. 12 engaging scrollytelling examples to inspire your content, accessed August 24, 2025, [https://shorthand.com/the-craft/scrollytelling-examples/index.html](https://shorthand.com/the-craft/scrollytelling-examples/index.html)  
66. Best Scrollytelling Websites | Free Examples & Designs \- Webflow, accessed August 24, 2025, [https://webflow.com/made-in-webflow/scrollytelling](https://webflow.com/made-in-webflow/scrollytelling)  
67. How to use custom animated cursors to upgrade your website UX (+ ..., accessed August 24, 2025, [https://blog.hubspot.com/website/animated-cursor](https://blog.hubspot.com/website/animated-cursor)  
68. 10 Examples of Imaginative Mouse Cursor Design \- Qode Interactive, accessed August 24, 2025, [https://qodeinteractive.com/magazine/examples-of-imaginative-mouse-cursor-design/](https://qodeinteractive.com/magazine/examples-of-imaginative-mouse-cursor-design/)  
69. Best Mouse Movement Websites | Free Examples & Designs \- Webflow, accessed August 24, 2025, [https://webflow.com/made-in-webflow/mouse-movement](https://webflow.com/made-in-webflow/mouse-movement)  
70. Hovers, Cursors and Cute Interactions \- Awwwards, accessed August 24, 2025, [https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/)  
71. User Journey Maps \- Usability & Web Accessibility \- Yale University, accessed August 24, 2025, [https://usability.yale.edu/understanding-your-user/user-journey-maps](https://usability.yale.edu/understanding-your-user/user-journey-maps)  
72. A Complete Guide to Customer Journey Mapping | Atlassian Team Playbook, accessed August 24, 2025, [https://www.atlassian.com/team-playbook/plays/customer-journey-mapping](https://www.atlassian.com/team-playbook/plays/customer-journey-mapping)  
73. BEST 10 Customer Journey Map Templates \- Miro, accessed August 24, 2025, [https://miro.com/templates/customer-journey-map/](https://miro.com/templates/customer-journey-map/)