# ReasonPath AI/LLM Dictionary (150 Terms)

## A

**Activation Function**
* **Category:** Neural Network Components
* **Definition:** A mathematical function inside a neuron that determines its output level, essentially deciding whether the neuron "fires" or not based on the weighted sum of its inputs.
* **Analogy:** It's the "dimmer switch" on a light bulb. Based on the amount of electricity (input), the switch decides how brightly the bulb (the neuron's output) should shine.
* **See Also:** `[[Neural Network]]`, `[[Backpropagation]]`, `[[Hidden Layer]]`

**Adaptive Learning Rate**
* **Category:** Training Techniques
* **Definition:** An optimization technique where the learning rate is adjusted automatically during training, often decreasing as the model gets closer to a solution to allow for more precise adjustments.
* **Analogy:** It's like playing mini-golf. You start with big, powerful putts to get close to the hole (a high learning rate), then switch to small, careful taps (a low learning rate) to sink the ball.
* **See Also:** `[[Learning Rate]]`, `[[Optimizer]]`, `[[Gradient Descent]]`

**Agent (AI Agent)**
* **Category:** AI Concepts
* **Definition:** An autonomous entity that perceives its environment through sensors and acts upon that environment through actuators to achieve specific goals. LLM-powered agents can perform complex, multi-step tasks.
* **Analogy:** An AI agent is like a personal assistant you give a high-level goal to, like "plan my vacation." It then independently performs all the sub-tasks: researching flights, booking hotels, and creating an itinerary.
* **See Also:** `[[Workflow Automation (AI)]]`, `[[Reasoning]]`, `[[Tool Use]]`

**AI Governance**
* **Category:** AI Safety & Ethics
* **Definition:** The overarching framework of rules, policies, standards, and processes for ensuring that AI is developed and used responsibly, ethically, and in compliance with legal and social norms.
* **Analogy:** It's the "city planning commission" for AI. It doesn't build the individual houses (AI models) but creates the zoning laws, building codes, and public infrastructure to ensure the city grows safely and benefits everyone.
* **See Also:** `[[Data Governance]]`, `[[Alignment]]`, `[[Guardrails]]`

**Alignment**
* **Category:** AI Safety & Ethics
* **Definition:** The ongoing research problem of ensuring that an AI model's goals and behaviors are aligned with human values and intentions, especially as models become more powerful and autonomous.
* **Analogy:** It's like training a super-intelligent sheepdog. It's not enough for the dog to be smart; you have to ensure its goal is to protect the sheep (human values), not just chase them for fun (an unintended outcome).
* **See Also:** `[[Constitutional AI]]`, `[[RLHF (Reinforcement Learning from Human Feedback)]]`, `[[Guardrails]]`

**API (Application Programming Interface)**
* **Category:** Practical Applications
* **Definition:** A set of rules and protocols that allows one software application to interact with and use the services of another. Most access to large language models is provided via an API.
* **Analogy:** An API is like a restaurant menu. It provides a list of dishes (functions) you can order, with a clear description of what you'll get, without needing to know how the kitchen (the application) actually prepares the food.
* **See Also:** `[[Frameworks (AI)]]`, `[[Inference]]`, `[[Latency]]`

**Artificial General Intelligence (AGI)**
* **Category:** AI Concepts
* **Definition:** A hypothetical form of AI that possesses the ability to understand, learn, and apply its intelligence to solve any intellectual task that a human being can.
* **Analogy:** If current AI is like a specialized tool (a calculator or a GPS), AGI would be like a multi-purpose Swiss Army knife that can adapt and learn to perform any task you give it.
* **See Also:** `[[Language Model]]`, `[[Reasoning]]`, `[[Superintelligence]]`

**Attention Mechanism**
* **Category:** Model Architecture
* **Definition:** A key component in Transformer models that allows the model to weigh the importance of different words in the input sequence when processing a specific word, enabling it to handle long-range dependencies.
* **Analogy:** When you read a sentence, you instinctively pay more attention to certain words to understand the context. The attention mechanism is the AI's way of "highlighting" the most relevant words as it processes the text.
* **See Also:** `[[Transformer]]`, `[[Self-Attention]]`, `[[Encoder]]`

## B

**Backpropagation**
* **Category:** Training Techniques
* **Definition:** An algorithm used to train neural networks by calculating the error (loss) of a prediction and propagating this error backward through the network's layers to update the weights.
* **Analogy:** It's like a coach reviewing a game tape with the team. The coach points out the final error (the missed shot), then works backward to show each player how their specific action contributed to it so they can adjust for the next play.
* **See Also:** `[[Gradient Descent]]`, `[[Loss Function]]`, `[[Neural Network]]`

**Batch Size**
* **Category:** Training Techniques
* **Definition:** The number of training examples utilized in one iteration (i.e., one forward and backward pass) before the model's parameters are updated.
* **Analogy:** It's the size of the "study group" of flashcards you review before deciding what you need to study more. You could review one card at a time or a batch of 32 before updating your knowledge.
* **See Also:** `[[Epoch]]`, `[[Stochastic Gradient Descent (SGD)]]`, `[[Hyperparameter]]`

**Bayesian Networks**
* **Category:** Model Types
* **Definition:** A probabilistic graphical model that represents a set of variables and their conditional dependencies using a directed acyclic graph.
* **Analogy:** It's a "map of beliefs." Each city is a variable (e.g., "Rain"), and the roads show how likely one city is to affect another (e.g., how "Rain" affects the chance of "Traffic Jams").
* **See Also:** `[[Probabilistic Model]]`, `[[Reasoning]]`, `[[Knowledge Graph]]`

**Benchmarking Suite**
* **Category:** Evaluation
* **Definition:** A standardized collection of datasets, tasks, and tests used to comprehensively and fairly evaluate the performance of different AI models.
* **Analogy:** It's the AI equivalent of the SAT or the Olympics. It provides a common set of challenges that all models can compete on, allowing for a fair comparison of their abilities.
* **See Also:** `[[Evaluation Metric]]`, `[[Perplexity]]`, `[[BLEU Score]]`

**Bias (AI Bias)**
* **Category:** AI Safety & Ethics
* **Definition:** A phenomenon where an AI system produces outputs that are systematically prejudiced due to erroneous assumptions in the machine learning process, often reflecting biases present in the training data.
* **Analogy:** If you train a hiring AI by only showing it résumés from a company that historically only hired men, the AI will learn a biased rule that "being male" is a key qualification for the job.
* **See Also:** `[[Data Governance]]`, `[[Alignment]]`, `[[Fairness]]`

**Bias-Variance Tradeoff**
* **Category:** Core Concepts
* **Definition:** A fundamental principle in machine learning that involves finding the right balance between a model that is too simple and makes strong assumptions (high bias, underfitting) and a model that is too complex and learns the training data's noise (high variance, overfitting).
* **Analogy:** It's like giving a student rules for a test. Too few rules (high bias) and they fail to capture nuance. Too many specific rules (high variance) and they just memorize the practice questions without learning the underlying concepts.
* **See Also:** `[[Underfitting]]`, `[[Overfitting]]`, `[[Regularization]]`

**BLEU Score**
* **Category:** Evaluation
* **Definition:** An evaluation metric primarily used for machine translation that measures how similar a candidate translation is to one or more high-quality reference translations.
* **Analogy:** It grades an AI's translation by comparing it to several expert human translations and counting how many words and phrases overlap. A high score means the AI's output was very close to what a human would have written.
* **See Also:** `[[Evaluation Metric]]`, `[[ROUGE]]`, `[[Perplexity]]`

## C

**Catastrophic Forgetting**
* **Category:** Model Behavior
* **Definition:** A phenomenon where a neural network, after being trained on a new task, loses its ability to perform a previously learned task. The new knowledge effectively overwrites the old knowledge.
* **Analogy:** It's like becoming fluent in Spanish and then, in the process of learning Italian, completely forgetting the French you learned last year.
* **See Also:** `[[Transfer Learning]]`, `[[Fine-Tuning]]`, `[[Continual Learning]]`

**Chain-of-Thought (CoT)**
* **Category:** Prompting Techniques
* **Definition:** A prompting technique that guides a language model to break down a complex problem into a series of logical, sequential steps before providing a final answer, often improving its reasoning capabilities.
* **Analogy:** It's the AI equivalent of a math teacher saying, "Don't just give me the answer; show me how you got there." It makes the reasoning process transparent and less prone to error.
* **See Also:** `[[Prompt Engineering]]`, `[[Zero-Shot Learning]]`, `[[Reasoning]]`

**Classifier**
* **Category:** Model Types
* **Definition:** An AI model trained to sort input data into predefined categories or classes. It learns from labeled data to recognize patterns that distinguish one category from another.
* **Analogy:** It's a digital "sorting hat," looking at each piece of data and placing it into a specific group based on its features.
* **See Also:** `[[Supervised Learning]]`, `[[Decision Tree]]`, `[[Logistic Regression]]`

**Clustering**
* **Category:** Unsupervised Learning
* **Definition:** An unsupervised learning technique used to group unlabeled data points based on their inherent similarities. The algorithm itself discovers the patterns and structures within the data.
* **Analogy:** It's like dumping a mixed bag of groceries on a table and grouping them—all the fruits here, all the vegetables there—without any prior labels telling you what to do.
* **See Also:** `[[Unsupervised Learning]]`, `[[K-Means Clustering]]`, `[[Vectorization]]`

**Compute**
* **Category:** Core Concepts
* **Definition:** The raw computational power, typically provided by specialized hardware like GPUs or TPUs, required to perform AI tasks.
* **Analogy:** Compute is the "engine" for AI. A simple task might need a car engine, but training a massive model like GPT-4 requires the power of a fleet of rocket ships.
* **See Also:** `[[GPU (Graphics Processing Unit)]]`, `[[TPU (Tensor Processing Unit)]]`, `[[Training]]`

**Concept Drift**
* **Category:** Model Behavior
* **Definition:** The gradual degradation of an AI model's performance over time because the real-world data it operates on has changed since it was trained.
* **Analogy:** It's like using a travel guide from 2010 to navigate a city today. The roads and restaurants have changed, making the old guide unreliable.
* **See Also:** `[[Data Augmentation]]`, `[[Grounding]]`, `[[Continual Learning]]`

**Constitutional AI**
* **Category:** AI Safety & Ethics
* **Definition:** A technique for training a helpful and harmless AI model without relying on extensive human feedback. The model learns to critique and revise its own responses based on a short list of guiding principles or a "constitution."
* **Analogy:** It's like giving an AI a copy of the constitution and the law, and telling it to judge its own behavior against those rules, rather than having a human review every single action it takes.
* **See Also:** `[[Alignment]]`, `[[RLHF (Reinforcement Learning from Human Feedback)]]`, `[[Guardrails]]`

**Continual Learning**
* **Category:** Training Techniques
* **Definition:** A machine learning paradigm where the model learns incrementally from a continuous stream of data, acquiring new knowledge while retaining previously learned skills, aiming to overcome catastrophic forgetting.
* **Analogy:** It's the process of a human learning throughout their life. You learn new skills (like a new software) without forgetting old ones (like how to ride a bike).
* **See Also:** `[[Catastrophic Forgetting]]`, `[[Transfer Learning]]`, `[[Online Learning]]`

## D

**Data Augmentation**
* **Category:** Data Science
* **Definition:** The process of artificially increasing the size and diversity of a training dataset by creating modified copies of existing data (e.g., rotating an image, rephrasing a sentence).
* **Analogy:** It's like a chef taking one tomato and creating multiple training examples from it—slicing it, dicing it, roasting it—to teach a new cook all the different forms a tomato can take.
* **See Also:** `[[Synthetic Data]]`, `[[Overfitting]]`, `[[Robustness]]`

**Data Governance**
* **Category:** AI Governance
* **Definition:** The framework of rules, policies, and processes for ensuring that data is used securely, ethically, and effectively within an organization.
* **Analogy:** It's the "rulebook for the library." It dictates who can check out books, how they must be handled, and how to ensure the information is accurate and protected.
* **See Also:** `[[AI Governance]]`, `[[Bias (AI Bias)]]`, `[[Data Privacy]]`

**Data Privacy**
* **Category:** AI Safety & Ethics
* **Definition:** The area of data management concerned with the proper handling of sensitive data, including consent, notice, and regulatory obligations.
* **Analogy:** It's like the seal on a letter. It ensures that only the intended recipient can read the contents and that the information isn't exposed to anyone who shouldn't see it.
* **See Also:** `[[Data Governance]]`, `[[Federated Learning]]`, `[[Anonymization]]`

**Decision Tree**
* **Category:** Model Types
* **Definition:** A supervised learning model that predicts outcomes by working through a series of branching, "if-then-else" questions, creating a structure that resembles a tree.
* **Analogy:** It works like a game of "20 Questions." You start with a broad question and, based on the answer, follow a specific path of narrower questions until you arrive at the final answer.
* **See Also:** `[[Classifier]]`, `[[Supervised Learning]]`, `[[Random Forest]]`

**Decoder**
* **Category:** Model Architecture
* **Definition:** The component of a sequence-to-sequence architecture (like a Transformer) that is responsible for generating the output. It takes the compressed information from the encoder and translates it into a human-understandable format.
* **Analogy:** If the encoder is a diplomat who listens to a foreign speech and writes down the key ideas in shorthand, the decoder is the diplomat who takes those notes and translates them back into a full, eloquent speech.
* **See Also:** `[[Encoder]]`, `[[Transformer]]`, `[[Attention Mechanism]]`

**Deep Learning**
* **Category:** Core Concepts
* **Definition:** A subfield of machine learning based on artificial neural networks with multiple layers (deep architectures) that can learn complex patterns from large amounts of data.
* **Analogy:** Traditional machine learning is like a student learning to identify a cat from a list of features (whiskers, pointy ears). Deep learning is like a baby who learns to identify a cat on their own by looking at thousands of pictures of cats.
* **See Also:** `[[Neural Network]]`, `[[Machine Learning]]`, `[[Hidden Layer]]`

**Diffusion Models**
* **Category:** Model Types
* **Definition:** A class of generative models that create data, typically images, by starting with random noise and progressively refining it through a learned "de-noising" process until a coherent output is formed.
* **Analogy:** It's like a sculptor starting with a block of marble (random noise) and slowly chipping away the pieces that don't look like a statue (de-noising) until the final, detailed sculpture emerges.
* **See Also:** `[[Generative AI]]`, `[[GAN (Generative Adversarial Network)]]`, `[[Latent Space]]`

**Domain Adaptation**
* **Category:** Training Techniques
* **Definition:** A technique for adapting a model trained on one "source" domain to perform well on a different but related "target" domain, especially when there is little labeled data in the new domain.
* **Analogy:** It's like a skilled bicycle mechanic learning to repair a motorcycle. They adapt their existing knowledge of wheels and brakes to the new, slightly different context.
* **See Also:** `[[Transfer Learning]]`, `[[Few-Shot Learning]]`, `[[Fine-Tuning]]`

## E

**Embeddings**
* **Category:** Core Concepts
* **Definition:** A numerical vector representation of a piece of data, such as a word, sentence, or image. These vectors capture the semantic meaning, allowing models to understand relationships between concepts.
* **Analogy:** Embeddings are like coordinates on a map of meaning. Words like "king" and "queen" would be located close to each other, just as the vector from "king" to "queen" would be similar to the one from "man" to "woman."
* **See Also:** `[[Vectorization]]`, `[[Latent Space]]`, `[[Word2Vec]]`

**Encoder**
* **Category:** Model Architecture
* **Definition:** The component of a sequence-to-sequence architecture (like a Transformer) that processes the input data and compresses it into a dense, meaningful numerical representation (a context vector).
* **Analogy:** It's like a translator reading a long paragraph in one language and summarizing its entire meaning into a single, dense sentence before handing it off to be translated.
* **See Also:** `[[Decoder]]`, `[[Transformer]]`, `[[Attention Mechanism]]`

**Epoch**
* **Category:** Training Techniques
* **Definition:** One complete pass through the entire training dataset during the training of a machine learning model.
* **Analogy:** If your training data is a deck of flashcards, one epoch is completed when you have gone through every single card in the deck exactly once.
* **See Also:** `[[Batch Size]]`, `[[Training]]`, `[[Iteration]]`

**Evaluation Metric**
* **Category:** Evaluation
* **Definition:** A quantitative measure used to assess the performance of a model. Common metrics include accuracy, precision, recall, F1 score, and perplexity.
* **Analogy:** It's the "grade" on the model's report card. Different subjects (tasks) have different ways of grading (metrics) to show how well the model performed.
* **See Also:** `[[Benchmarking Suite]]`, `[[Accuracy]]`, `[[Precision & Recall]]`

**Explainable AI (XAI)**
* **Category:** AI Safety & Ethics
* **Definition:** A set of processes and methods that allows human users to comprehend and trust the results and output created by machine learning algorithms. It aims to answer the question, "Why did the model make that decision?"
* **Analogy:** It's the difference between a doctor saying "You're sick" and a doctor saying "You're sick because your test results show X, which indicates condition Y." The explanation builds trust and understanding.
* **See Also:** `[[Interpretability]]`, `[[AI Governance]]`, `[[Transparency]]`

**Exploding Gradient Problem**
* **Category:** Training Challenges
* **Definition:** A problem in training deep neural networks where the gradients (error signals) grow exponentially large as they are propagated backward, causing unstable updates to the model's weights.
* **Analogy:** It's like a series of people whispering a message, but instead of getting quieter, each person shouts it louder than the last, until the final message is a deafening, meaningless roar.
* **See Also:** `[[Vanishing Gradient Problem]]`, `[[Gradient Clipping]]`, `[[Backpropagation]]`

## F

**Fairness**
* **Category:** AI Safety & Ethics
* **Definition:** A quality of an AI model signifying that its predictions are not biased toward or against certain subgroups, particularly those defined by sensitive attributes like race, gender, or age.
* **Analogy:** A fair loan-approval AI would grant loans based only on financial factors, not demographic ones. The approval rate for equally qualified applicants from different groups should be the same.
* **See Also:** `[[Bias (AI Bias)]]`, `[[AI Governance]]`, `[[Evaluation Metric]]`

**Feature Engineering**
* **Category:** Data Science
* **Definition:** The process of using domain knowledge to select, create, or transform the most relevant input variables (features) from raw data to improve the performance of a machine learning model.
* **Analogy:** It's like a chef preparing ingredients before cooking. Instead of just throwing in a whole potato, they might chop, peel, or mash it (transforming the feature) to make it more useful for the final dish (the model).
* **See Also:** `[[Data Augmentation]]`, `[[Embeddings]]`, `[[Vectorization]]`

**Federated Learning**
* **Category:** Training Techniques
* **Definition:** A privacy-preserving machine learning technique where a model is trained across multiple decentralized devices (like phones) holding local data samples, without exchanging that data.
* **Analogy:** It's like teaching a group of students a new song. Instead of having them all come to one classroom, the teacher sends the sheet music to each student's home. The students practice locally, and only send back their learnings (the model updates), not their private practice sessions (the data).
* **See Also:** `[[Data Privacy]]`, `[[Decentralized AI]]`, `[[Edge AI]]`

**Few-Shot Learning**
* **Category:** Learning Paradigms
* **Definition:** The ability of a model to learn a new task and make accurate predictions after being shown only a very small number of labeled examples (the "shots").
* **Analogy:** It's like showing someone a picture of a zebra and a horse, and then asking them to identify a picture of an okapi. They can generalize from the few examples to understand the new, related concept.
* **See Also:** `[[Zero-Shot Learning]]`, `[[One-Shot Learning]]`, `[[Transfer Learning]]`

**Fine-Tuning**
* **Category:** Training Techniques
* **Definition:** The process of taking a pre-trained model and further training it on a smaller, specific dataset to adapt it for a specialized task.
* **Analogy:** It's like hiring a talented, generally-trained chef (the pre-trained model) and then giving them a short course on your restaurant's specific menu (the new dataset) to make them a specialist.
* **See Also:** `[[Transfer Learning]]`, `[[Pre-training]]`, `[[LoRA (Low-Rank Adaptation)]]`

**Foundation Model**
* **Category:** Model Types
* **Definition:** A large-scale, pre-trained model (like GPT-4) that can be adapted to a wide range of downstream tasks through fine-tuning, serving as a base or "foundation" for many different applications.
* **Analogy:** A foundation model is like a massive, well-stocked factory. You can use that same factory (the base model) to produce a wide variety of different products (specialized applications) with only minor re-tooling (fine-tuning).
* **See Also:** `[[Pre-training]]`, `[[Fine-Tuning]]`, `[[Language Model]]`

**Frameworks (AI)**
* **Category:** Practical Applications
* **Definition:** Software libraries and toolkits, such as TensorFlow, PyTorch, and JAX, that provide building blocks and abstractions for creating, training, and deploying machine learning models.
* **Analogy:** AI frameworks are like a set of high-quality LEGO bricks for building AI. Instead of making each brick from scratch, you get a pre-made kit with all the standard pieces, allowing you to build complex structures much faster.
* **See Also:** `[[TensorFlow]]`, `[[PyTorch]]`, `[[Compute]]`

## G

**GAN (Generative Adversarial Network)**
* **Category:** Model Types
* **Definition:** A class of generative models where two neural networks, a Generator and a Discriminator, are trained in competition. The Generator tries to create realistic data, while the Discriminator tries to distinguish the fake data from real data.
* **Analogy:** It's a competition between an art forger (Generator) and an art critic (Discriminator). The forger gets better by trying to fool the critic, and the critic gets better by catching the forgeries. In the end, you get a very skilled forger.
* **See Also:** `[[Generative AI]]`, `[[Diffusion Models]]`, `[[Unsupervised Learning]]`

**Generative AI**
* **Category:** AI Concepts
* **Definition:** A branch of artificial intelligence that focuses on creating new, original content—such as text, images, music, or code—that is similar to, but not a copy of, the data it was trained on.
* **Analogy:** It's like a musician who studies thousands of jazz songs. They don't just play back the songs they learned; they use their understanding of the patterns and structures to compose a brand new, original jazz piece.
* **See Also:** `[[GAN (Generative Adversarial Network)]]`, `[[Diffusion Models]]`, `[[Large Language Model (LLM)]]`

**GPU (Graphics Processing Unit)**
* **Category:** Hardware
* **Definition:** A specialized electronic circuit designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer intended for output to a display device. Their parallel structure makes them ideal for the matrix multiplication operations required for training deep learning models.
* **Analogy:** If a CPU is like a single, brilliant manager who can handle any complex task one-by-one, a GPU is like a huge team of interns who can perform thousands of simple, repetitive tasks (like calculations) all at the same time.
* **See Also:** `[[TPU (Tensor Processing Unit)]]`, `[[Compute]]`, `[[Neural Network]]`

**Gradient Clipping**
* **Category:** Training Techniques
* **Definition:** A technique used to combat the exploding gradient problem by capping the magnitude of the gradients at a predefined threshold during backpropagation.
* **Analogy:** It's a "volume limiter" during the whispering game. If someone tries to shout the message too loudly (an exploding gradient), the limiter forces them to use a normal volume, keeping the process stable.
* **See Also:** `[[Exploding Gradient Problem]]`, `[[Backpropagation]]`, `[[Hyperparameter]]`

**Gradient Descent**
* **Category:** Training Techniques
* **Definition:** An iterative optimization algorithm used to find the minimum value of a function. In machine learning, it's used to minimize the model's loss function by adjusting the model parameters in the direction opposite to the gradient.
* **Analogy:** It's like trying to walk to the bottom of a foggy valley. You can't see the bottom, but you can feel which direction is downhill from your current position. You take a step in that direction, check again, and repeat until you reach the lowest point.
* **See Also:** `[[Backpropagation]]`, `[[Loss Function]]`, `[[Learning Rate]]`

**Grounding**
* **Category:** AI Safety & Ethics
* **Definition:** The process of connecting a language model's outputs to verifiable, external sources of knowledge or facts to ensure accuracy and reduce hallucination.
* **Analogy:** It's like a journalist being required to cite their sources. The model isn't allowed to just state something as fact; it has to be able to point to the reliable document or data source where it found the information.
* **See Also:** `[[Hallucination]]`, `[[Retrieval-Augmented Generation (RAG)]]`, `[[Knowledge Graph]]`

**Guardrails**
* **Category:** AI Safety & Ethics
* **Definition:** Safety mechanisms, policies, and filters designed to prevent an AI model from producing harmful, unethical, or inappropriate outputs.
* **Analogy:** They are the "bumper lanes" in a bowling alley for AI. They don't control where the ball goes, but they prevent it from going into the gutter (generating harmful content).
* **See Also:** `[[AI Governance]]`, `[[Alignment]]`, `[[Red Teaming]]`

## H

**Hallucination**
* **Category:** Model Behavior
* **Definition:** A phenomenon where an AI model generates text that is factually incorrect, nonsensical, or disconnected from the provided source material, but presents it with high confidence.
* **Analogy:** It's like a confident student who, when they don't know the answer to a test question, makes up a plausible-sounding answer instead of admitting they don't know.
* **See Also:** `[[Grounding]]`, `[[Retrieval-Augmented Generation (RAG)]]`, `[[Factual Consistency]]`

**Heuristics**
* **Category:** Core Concepts
* **Definition:** Mental shortcuts or rules-of-thumb that are not guaranteed to be optimal but are used for problem-solving and decision-making when an exhaustive search is impractical.
* **Analogy:** When navigating a maze, a good heuristic is "always keep your right hand on the wall." It might not be the fastest route, but it's a simple rule that will eventually get you to the exit.
* **See Also:** `[[Algorithm]]`, `[[Symbolic AI]]`, `[[Search Algorithm]]`

**Hidden Layer**
* **Category:** Neural Network Components
* **Definition:** Any layer of neurons in an artificial neural network that is situated between the input layer and the output layer. These layers are where the model learns complex patterns and representations.
* **Analogy:** In a company, the input layer is the mailroom receiving customer requests, and the output layer is the CEO making the final decision. The hidden layers are all the departments in between (marketing, engineering, finance) that process the information in complex ways.
* **See Also:** `[[Neural Network]]`, `[[Deep Learning]]`, `[[Activation Function]]`

**Hyperparameter**
* **Category:** Training Techniques
* **Definition:** A configuration variable that is set before the training process begins and is not learned by the model itself. Examples include the learning rate, batch size, and the number of layers in a network.
* **Analogy:** Hyperparameters are the "settings" you choose on a washing machine before you press start—the cycle type, water temperature, and spin speed. The machine (the model) does the learning (washing), but its performance depends on these initial settings.
* **See Also:** `[[Tuning]]`, `[[Learning Rate]]`, `[[Batch Size]]`

**Hybrid AI**
* **Category:** AI Concepts
* **Definition:** An approach that combines different AI techniques, typically symbolic AI (which uses rules and logic) with sub-symbolic AI (like neural networks), to leverage the strengths of both.
* **Analogy:** It's like a detective who combines hard data and evidence (machine learning) with their knowledge of the law and deductive reasoning (symbolic AI) to solve a case.
* **See Also:** `[[Symbolic AI]]`, `[[Neural Network]]`, `[[Neuro-Symbolic AI]]`

## I

**Imitation Learning**
* **Category:** Learning Paradigms
* **Definition:** A form of learning where an AI agent learns to perform a task by observing and mimicking demonstrations from an expert, typically a human.
* **Analogy:** It's how an apprentice learns a craft. They don't learn from a textbook; they watch the master craftsman work and try to replicate their actions until they achieve the same result.
* **See Also:** `[[Reinforcement Learning]]`, `[[Supervised Learning]]`, `[[Behavioral Cloning]]`

**In-context Learning**
* **Category:** Learning Paradigms
* **Definition:** The ability of a large language model to learn a new task at inference time simply by being provided with a few examples within the prompt itself, without any updates to its weights.
* **Analogy:** It's like giving someone a quick mini-lesson before asking them a question. You say, "A 'glorp' is a happy cat. A 'flim' is a sad dog. Now, what is a 'glorp'?" The person learns the rule "on the fly" from the context you provided.
* **See Also:** `[[Few-Shot Learning]]`, `[[Prompt Engineering]]`, `[[Meta-Learning]]`

**Inference**
* **Category:** Core Concepts
* **Definition:** The process of using a trained AI model to make predictions or generate outputs on new, previously unseen data. This is also known as the "deployment" or "production" phase.
* **Analogy:** If training is like studying for an exam, inference is like actually taking the exam. It's the moment the model applies its knowledge to solve a new problem.
* **See Also:** `[[Training]]`, `[[Latency]]`, `[[Throughput]]`

**Input Embedding**
* **Category:** Neural Network Components
* **Definition:** The initial layer of a model that transforms raw input data (like words or pixels) into dense numerical vectors (embeddings) that the rest of the network can process.
* **Analogy:** It's the "translator" at the entrance of the United Nations. It takes all the different languages (raw data) and converts them into a common, universal language (vectors) that all the diplomats (neurons) can understand.
* **See Also:** `[[Embeddings]]`, `[[Vectorization]]`, `[[Tokenizer]]`

**Interpretability**
* **Category:** AI Safety & Ethics
* **Definition:** The degree to which a human can understand the cause and effect of a model's decisions. It is a key component of Explainable AI (XAI).
* **Analogy:** It's the difference between a "black box" that gives you answers and a clear glass box where you can see all the internal gears turning and understand exactly how it arrived at its conclusion.
* **See Also:** `[[Explainable AI (XAI)]]`, `[[Transparency]]`, `[[Mechanistic Interpretability]]`

## J

**Jailbreak Prompt**
* **Category:** AI Safety & Ethics
* **Definition:** A specially crafted prompt designed to bypass an AI model's safety restrictions and guardrails, tricking it into generating content that violates its own policies.
* **Analogy:** It's like finding a secret password or a logical loophole that convinces a security guard (the AI's safety filter) to let you into a restricted area, even though you're not supposed to be there.
* **See Also:** `[[Prompt Injection]]`, `[[Red Teaming]]`, `[[Guardrails]]`

## K

**K-Means Clustering**
* **Category:** Unsupervised Learning
* **Definition:** A popular unsupervised learning algorithm that partitions a dataset into a pre-determined number (K) of clusters, where each data point belongs to the cluster with the nearest mean (centroid).
* **Analogy:** It's like placing K magnets on a table covered in metal filings. The filings will naturally group themselves around the nearest magnet, forming K distinct clusters.
* **See Also:** `[[Clustering]]`, `[[Unsupervised Learning]]`, `[[Centroid]]`

**Knowledge Distillation**
* **Category:** Training Techniques
* **Definition:** A model compression technique where a smaller "student" model is trained to mimic the behavior and outputs of a larger, more complex "teacher" model, thus transferring knowledge to a more efficient form.
* **Analogy:** It's like a master chef (teacher model) writing a simplified cookbook for home cooks (student model). The student learns to replicate the master's results without needing the years of complex training the master went through.
* **See Also:** `[[Model Compression]]`, `[[Pruning]]`, `[[Quantization]]`

**Knowledge Graph**
* **Category:** Data Structures
* **Definition:** A structured representation of knowledge as a network of entities (nodes) and the relationships between them (edges). It's used by AI to understand context and relationships in data.
* **Analogy:** It's like a "family tree" for information. It doesn't just list names; it shows exactly how everyone is related—who is a parent, who is a sibling, and so on—creating a rich map of connections.
* **See Also:** `[[Ontology]]`, `[[Grounding]]`, `[[Symbolic AI]]`

## L

**Language Model (LM)**
* **Category:** Model Types
* **Definition:** An AI model trained to understand and generate human language. At its core, it's a probabilistic model that calculates the likelihood of a given sequence of words.
* **Analogy:** It's an incredibly advanced version of the autocomplete on your phone. It has learned the patterns of language so well that it can predict the next word, sentence, or entire paragraph with high accuracy.
* **See Also:** `[[Large Language Model (LLM)]]`, `[[Natural Language Processing (NLP)]]`, `[[Transformer]]`

**Large Language Model (LLM)**
* **Category:** Model Types
* **Definition:** A language model characterized by its massive size, typically containing billions of parameters, which allows it to achieve general-purpose language understanding and generation capabilities.
* **Analogy:** If a regular language model is like someone who has read a few books, an LLM is like someone who has read the entire internet. Its vast knowledge allows it to discuss almost any topic.
* **See Also:** `[[Foundation Model]]`, `[[Generative AI]]`, `[[GPT (Generative Pretrained Transformer)]]`

**Latent Space**
* **Category:** Core Concepts
* **Definition:** An abstract, multi-dimensional space where data is represented in a compressed, meaningful way. The model learns this space, and points that are close together in latent space are similar in the real world.
* **Analogy:** It's a "map of concepts." In the latent space for images, all the pictures of cats would be clustered in one region, while all the pictures of dogs would be in another. The space between them represents the transition from cat-like to dog-like features.
* **See Also:** `[[Embeddings]]`, `[[Vectorization]]`, `[[Diffusion Models]]`

**Latency**
* **Category:** Evaluation
* **Definition:** The time delay between a user's query (input) and the moment the AI model provides a response (output). Lower latency is critical for real-time applications.
* **Analogy:** It's the "lag" you experience in a video call. A high latency means there's a long, awkward pause between when you speak and when the other person hears you.
* **See Also:** `[[Inference]]`, `[[Throughput]]`, `[[API (Application Programming Interface)]]`

**Learning Rate**
* **Category:** Training Techniques
* **Definition:** A hyperparameter that controls how much the model's weights are adjusted with respect to the loss gradient during training. It determines the size of the steps the model takes towards the optimal solution.
* **Analogy:** It's the size of the steps you take when walking down a foggy hill. If your steps are too big, you might overshoot the bottom. If they're too small, it will take forever to get there.
* **See Also:** `[[Gradient Descent]]`, `[[Adaptive Learning Rate]]`, `[[Hyperparameter]]`

**Logistic Regression**
* **Category:** Model Types
* **Definition:** A statistical algorithm used for binary classification tasks. It predicts the probability of a categorical dependent variable, such as pass/fail or yes/no.
* **Analogy:** It's like a simple gatekeeper. Based on a set of criteria (features), it calculates the probability that an input belongs to one of two groups and makes a "go/no-go" decision.
* **See Also:** `[[Classifier]]`, `[[Supervised Learning]]`, `[[Linear Regression]]`

**LoRA (Low-Rank Adaptation)**
* **Category:** Training Techniques
* **Definition:** A parameter-efficient fine-tuning (PEFT) method that significantly reduces the number of trainable parameters by freezing the pre-trained model weights and injecting small, trainable rank-decomposition matrices.
* **Analogy:** It's like adding a small set of "tuning knobs" to a massive, complex engine instead of rebuilding the entire engine. You can adjust these few knobs to change the engine's performance for a specific race, which is vastly more efficient.
* **See Also:** `[[Fine-Tuning]]`, `[[Parameter-Efficient Fine-Tuning (PEFT)]]`, `[[Model Compression]]`

**Loss Function**
* **Category:** Core Concepts
* **Definition:** A function that measures the difference, or "error," between the model's predictions and the actual ground truth labels in the training data. The goal of training is to minimize this function.
* **Analogy:** It's the "score" in a game of darts. It tells the model how far its dart (prediction) was from the bullseye (the correct answer). A lower score is better.
* **See Also:** `[[Gradient Descent]]`, `[[Backpropagation]]`, `[[Training]]`

## M

**Machine Learning (ML)**
* **Category:** AI Concepts
* **Definition:** A subfield of artificial intelligence where algorithms are trained on data to learn patterns and make predictions or decisions without being explicitly programmed for the task.
* **Analogy:** It's the difference between giving a computer a detailed recipe to bake a cake (traditional programming) and giving it thousands of pictures of good and bad cakes and letting it figure out the recipe on its own (machine learning).
* **See Also:** `[[Deep Learning]]`, `[[Supervised Learning]]`, `[[Unsupervised Learning]]`

**Meta-Learning**
* **Category:** Learning Paradigms
* **Definition:** A subfield of machine learning, often described as "learning to learn," where models are trained to improve their own learning algorithms and strategies, enabling them to learn new tasks more quickly and efficiently.
* **Analogy:** It's like a student who doesn't just memorize facts for one test, but learns effective study habits and note-taking skills that allow them to master any new subject much faster in the future.
* **See Also:** `[[Few-Shot Learning]]`, `[[In-context Learning]]`, `[[Transfer Learning]]`

**Mixture of Experts (MoE)**
* **Category:** Model Architecture
* **Definition:** A neural network architecture where multiple specialized "expert" sub-networks are used. A "gating network" decides which expert is best suited to handle a given input, routing the data accordingly.
* **Analogy:** It's like a general contractor (the gating network) who, when faced with a building project, calls in specialized experts—a plumber, an electrician, a carpenter—for each specific part of the job, rather than trying to do everything themselves.
* **See Also:** `[[Transformer]]`, `[[Sparse Models]]`, `[[Model Compression]]`

**Model Compression**
* **Category:** Training Techniques
* **Definition:** A set of techniques used to reduce the size (in terms of memory and disk space) and computational complexity of a machine learning model without a significant drop in performance.
* **Analogy:** It's like creating a "zip file" of a large AI model. You compress the information into a smaller package that's faster to download and run, while still being able to access all the important knowledge.
* **See Also:** `[[Quantization]]`, `[[Pruning]]`, `[[Knowledge Distillation]]`

**Multimodal Model**
* **Category:** Model Types
* **Definition:** An AI model that can process, understand, and generate information from multiple types of data, or "modalities," such as text, images, audio, and video, simultaneously.
* **Analogy:** It's like a person who can read a book, look at its illustrations, and listen to an accompanying audiobook all at the same time to get a complete and unified understanding of the story.
* **See Also:** `[[Vision-Language Model]]`, `[[Generative AI]]`, `[[Embeddings]]`

## N

**Named Entity Recognition (NER)**
* **Category:** Natural Language Processing (NLP)
* **Definition:** A natural language processing task that involves identifying and categorizing key pieces of information (entities) in text, such as names of people, organizations, locations, dates, and monetary values.
* **Analogy:** It's like a smart highlighter that automatically goes through a document and color-codes all the names of people in yellow, all the locations in blue, and all the dates in green.
* **See Also:** `[[Natural Language Processing (NLP)]]`, `[[Tokenization]]`, `[[Parsing]]`

**Natural Language Processing (NLP)**
* **Category:** AI Concepts
* **Definition:** A field of AI focused on enabling computers to understand, interpret, generate, and manipulate human language.
* **Analogy:** NLP is the bridge that allows humans and computers to communicate. It translates our messy, nuanced language into the structured, logical format that computers can understand, and vice versa.
* **See Also:** `[[Language Model (LM)]]`, `[[Sentiment Analysis]]`, `[[Named Entity Recognition (NER)]]`

**Neural Network**
* **Category:** Model Types
* **Definition:** A computational model inspired by the structure and function of the human brain. It consists of interconnected nodes, or "neurons," organized in layers, which process and transmit signals.
* **Analogy:** It's like a team of thousands of tiny, specialized workers. Each worker has a very simple job, but by passing their results to each other in organized layers, they can collectively solve incredibly complex problems.
* **See Also:** `[[Deep Learning]]`, `[[Hidden Layer]]`, `[[Activation Function]]`

**Normalization**
* **Category:** Data Science
* **Definition:** The process of scaling numerical data from different columns or features to a common range, such as 0 to 1 or -1 to 1, to ensure that no single feature dominates the learning process due to its scale.
* **Analogy:** It's like converting all currencies to US dollars before comparing them. You can't fairly compare 1,000 Japanese Yen to 100 British Pounds without first putting them on the same scale.
* **See Also:** `[[Feature Engineering]]`, `[[Data Preprocessing]]`, `[[Standardization]]`

## O

**One-Shot Learning**
* **Category:** Learning Paradigms
* **Definition:** A classification task where the model is given only a single example of each class and must then make predictions about new, unseen examples.
* **Analogy:** It's like showing a child a single picture of a giraffe and then expecting them to be able to identify any other giraffe they see in the future.
* **See Also:** `[[Few-Shot Learning]]`, `[[Zero-Shot Learning]]`, `[[Meta-Learning]]`

**Online Learning**
* **Category:** Learning Paradigms
* **Definition:** A machine learning method where the model is updated incrementally as new data points arrive one by one or in small batches, rather than being trained on the entire dataset at once.
* **Analogy:** It's like a news feed that updates in real-time. The system learns from each new story as it comes in, constantly refining its understanding of the world without needing to re-read all the old news.
* **See Also:** `[[Continual Learning]]`, `[[Streaming Data]]`, `[[Concept Drift]]`

**Ontology**
* **Category:** Data Structures
* **Definition:** A formal and explicit specification of a shared conceptualization. In AI, it's a structured way of representing knowledge within a domain, defining a set of concepts, their properties, and the relationships between them.
* **Analogy:** If a knowledge graph is a family tree, the ontology is the set of rules that define what a "family" is—what constitutes a "parent," a "child," a "sibling," and the rules governing those relationships.
* **See Also:** `[[Knowledge Graph]]`, `[[Symbolic AI]]`, `[[Semantic Web]]`

**Optimizer**
* **Category:** Training Techniques
* **Definition:** An algorithm or method used to change the attributes of the neural network, such as its weights and learning rate, in order to minimize the loss function. Examples include Adam, SGD, and RMSprop.
* **Analogy:** The optimizer is the "driver" that steers the model down the hill during gradient descent. It decides how fast to go (learning rate) and how to handle bumps and curves (momentum) to reach the bottom most efficiently.
* **See Also:** `[[Gradient Descent]]`, `[[Adaptive Learning Rate]]`, `[[Loss Function]]`

**Out-of-Distribution (OOD)**
* **Category:** Model Behavior
* **Definition:** Data that differs significantly from the data the model was trained on. Models often perform poorly and unpredictably when faced with OOD inputs.
* **Analogy:** It's like training a model to identify different types of house cats and then showing it a picture of a lion. The lion is "out-of-distribution" and the model may classify it incorrectly or with low confidence.
* **See Also:** `[[Robustness]]`, `[[Generalization]]`, `[[Concept Drift]]`

**Overfitting**
* **Category:** Training Challenges
* **Definition:** A modeling error that occurs when a model learns the training data too well, including its noise and random fluctuations, causing it to perform poorly on new, unseen data.
* **Analogy:** It's like a student who memorizes the exact answers to a practice exam but doesn't learn the underlying concepts. They get 100% on the practice test but fail the real exam because the questions are slightly different.
* **See Also:** `[[Underfitting]]`, `[[Bias-Variance Tradeoff]]`, `[[Regularization]]`

## P

**Parameter-Efficient Fine-Tuning (PEFT)**
* **Category:** Training Techniques
* **Definition:** A set of techniques designed to adapt large pre-trained models to new tasks by updating only a small fraction of the model's parameters, making the fine-tuning process much more computationally and memory efficient.
* **Analogy:** It's a method of customizing a car by only adjusting the side mirrors and the driver's seat (a few parameters) instead of rebuilding the entire engine and transmission (all parameters).
* **See Also:** `[[LoRA (Low-Rank Adaptation)]]`, `[[Fine-Tuning]]`, `[[Foundation Model]]`

**Perplexity**
* **Category:** Evaluation
* **Definition:** A common metric for evaluating the performance of a language model. It measures how well a probability model predicts a sample, with a lower perplexity score indicating a better model.
* **Analogy:** Perplexity is a measure of how "surprised" the model is by the next word in a sentence. A good model is less surprised because it has a better understanding of language patterns, resulting in a low perplexity score.
* **See Also:** `[[Evaluation Metric]]`, `[[Language Model (LM)]]`, `[[BLEU Score]]`

**Pipeline (AI)**
* **Category:** Practical Applications
* **Definition:** An end-to-end workflow that orchestrates a sequence of steps, including data ingestion, preprocessing, model training, evaluation, and deployment, to automate the machine learning lifecycle.
* **Analogy:** It's an automated assembly line for AI. Raw materials (data) go in one end, and a fully functional, deployed product (the model) comes out the other, with each step in the process handled automatically.
* **See Also:** `[[MLOps]]`, `[[Workflow Automation (AI)]]`, `[[Data Governance]]`

**Pre-training**
* **Category:** Training Techniques
* **Definition:** The initial, computationally intensive training phase where a large model is trained on a massive, general dataset to learn broad patterns, language structures, and world knowledge.
* **Analogy:** It's like sending a student to get a broad liberal arts education. They learn about history, science, and literature, gaining a wide range of general knowledge before they decide to specialize in a specific field (fine-tuning).
* **See Also:** `[[Fine-Tuning]]`, `[[Foundation Model]]`, `[[Transfer Learning]]`

**Precision & Recall**
* **Category:** Evaluation
* **Definition:** A pair of metrics used for classification tasks. Precision measures how many of the positive predictions were actually correct (the "quality" of predictions), while Recall measures how many of the actual positives were correctly identified (the "quantity" or "completeness" of predictions).
* **Analogy:** Imagine fishing with a net. Precision is the percentage of fish in your net (what you caught and said was a fish). Recall is the percentage of all the fish in the lake that are now in your net (what you successfully caught out of everything you should have caught).
* **See Also:** `[[Evaluation Metric]]`, `[[F1 Score]]`, `[[Classifier]]`

**Prompt Engineering**
* **Category:** Prompting Techniques
* **Definition:** The art and science of designing and refining input prompts to effectively guide a generative AI model toward producing a desired and accurate output.
* **Analogy:** It's like learning how to ask a question to a very knowledgeable but very literal genie. The way you phrase your wish (the prompt) dramatically changes the outcome.
* **See Also:** `[[Chain-of-Thought (CoT)]]`, `[[In-context Learning]]`, `[[Jailbreak Prompt]]`

**Prompt Injection**
* **Category:** AI Safety & Ethics
* **Definition:** A type of attack where a malicious user crafts a prompt to hijack the model's output by inserting instructions that override or ignore the original system prompt.
* **Analogy:** It's like a customer in a restaurant handing a waiter a note that says, "Ignore the chef's recipe and make my order this way instead." The waiter (the AI) gets confused and follows the malicious user's instructions.
* **See Also:** `[[Jailbreak Prompt]]`, `[[Guardrails]]`, `[[Red Teaming]]`

**Pruning**
* **Category:** Model Compression
* **Definition:** A model compression technique that involves removing unnecessary or redundant weights (parameters) from a trained neural network, often setting them to zero, to reduce model size and improve inference speed.
* **Analogy:** It's like trimming a bonsai tree. You carefully snip away the branches that aren't contributing to the overall shape and health of the tree, making it lighter and more elegant without changing its fundamental nature.
* **See Also:** `[[Model Compression]]`, `[[Quantization]]`, `[[Sparsity]]`

## Q

**Quantization**
* **Category:** Model Compression
* **Definition:** A technique to reduce the numerical precision of a model's weights and activations, for example, by converting them from 32-bit floating-point numbers to 8-bit integers. This shrinks the model size and speeds up inference.
* **Analogy:** It's like replacing a high-resolution photograph with a lower-resolution version. You lose a tiny bit of detail, but the file size is much smaller and it loads much faster, while still being perfectly recognizable.
* **See Also:** `[[Model Compression]]`, `[[Pruning]]`, `[[Inference]]`

**Q-Learning**
* **Category:** Reinforcement Learning
* **Definition:** A model-free reinforcement learning algorithm that learns a policy telling an agent what action to take under what circumstances. It does this by learning a "Q-value" for each state-action pair, which represents the quality of taking an action in a state.
* **Analogy:** It's like creating a "cheat sheet" for a video game. For every possible situation (state), the cheat sheet tells you the score (Q-value) you can expect to get for each possible button press (action). The agent learns to always choose the action with the highest score.
* **See Also:** `[[Reinforcement Learning]]`, `[[Agent (AI Agent)]]`, `[[Reward Model]]`

## R

**Random Forest**
* **Category:** Model Types
* **Definition:** An ensemble learning method that operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees.
* **Analogy:** It's like asking a large committee of experts (the decision trees) for their opinion on a question. The final decision is based on the majority vote, which is typically more accurate and robust than relying on a single expert.
* **See Also:** `[[Decision Tree]]`, `[[Ensemble Learning]]`, `[[XGBoost]]`

**Reasoning**
* **Category:** AI Concepts
* **Definition:** The ability of an AI system to apply logic, knowledge, and inference to solve problems, draw conclusions, and make decisions in a way that mimics human thought processes.
* **Analogy:** It's the difference between a calculator that can compute an answer and a mathematician who can understand the problem, formulate a strategy, and explain the proof behind the solution.
* **See Also:** `[[Chain-of-Thought (CoT)]]`, `[[Symbolic AI]]`, `[[Artificial General Intelligence (AGI)]]`

**Red Teaming**
* **Category:** AI Safety & Ethics
* **Definition:** A form of adversarial testing where a dedicated team acts as an adversary to probe an AI system for flaws, vulnerabilities, and harmful behaviors before it is deployed.
* **Analogy:** It's like hiring a team of ethical hackers to try and break into your new security system. Their job is to find all the weaknesses so you can fix them before a real burglar does.
* **See Also:** `[[Guardrails]]`, `[[Jailbreak Prompt]]`, `[[AI Safety]]`

**Regularization**
* **Category:** Training Techniques
* **Definition:** A set of techniques used to prevent overfitting by adding a penalty term to the loss function. This penalty discourages the model from becoming too complex and learning the noise in the training data.
* **Analogy:** It's like a law of simplicity for the model. It adds a "tax" for complexity, encouraging the model to find the simplest possible solution that still fits the data well.
* **See Also:** `[[Overfitting]]`, `[[Bias-Variance Tradeoff]]`, `[[Dropout]]`

**Reinforcement Learning (RL)**
* **Category:** Learning Paradigms
* **Definition:** A type of machine learning where an agent learns to make a sequence of decisions in an environment to maximize a cumulative reward signal, learning through trial and error.
* **Analogy:** It's like training a dog with treats. The dog (agent) tries different actions (sitting, rolling over). When it performs a desired action, it gets a treat (reward), making it more likely to perform that action again in the future.
* **See Also:** `[[Q-Learning]]`, `[[RLHF (Reinforcement Learning from Human Feedback)]]`, `[[Agent (AI Agent)]]`

**Representation Learning**
* **Category:** Core Concepts
* **Definition:** A set of techniques that allows a system to automatically discover the representations (features) needed for detection or classification from raw data, removing the need for manual feature engineering.
* **Analogy:** Instead of telling a model what features define a "cat" (pointy ears, whiskers), you show it thousands of cat pictures and it learns its own internal, highly effective representation of "cattiness."
* **See Also:** `[[Deep Learning]]`, `[[Embeddings]]`, `[[Feature Engineering]]`

**Residual Connection**
* **Category:** Model Architecture
* **Definition:** A "shortcut" or "skip connection" in a neural network where the input of a layer (or a block of layers) is added to its output. This helps combat the vanishing gradient problem in very deep networks.
* **Analogy:** It's an "express lane" for information in the neural network. It allows the gradient signal to bypass some layers, ensuring that the signal can travel back through a very deep network without fading away.
* **See Also:** `[[Vanishing Gradient Problem]]`, `[[Deep Learning]]`, `[[Transformer]]`

**Retrieval-Augmented Generation (RAG)**
* **Category:** Model Architecture
* **Definition:** A technique that enhances a generative model's output by first retrieving relevant information from an external knowledge base and then providing that information to the model as context to inform its generated response.
* **Analogy:** It's like giving a student an open-book exam. Instead of relying solely on what they have memorized, the student (the LLM) can first look up relevant facts from a textbook (the knowledge base) to construct a more accurate and detailed answer.
* **See Also:** `[[Grounding]]`, `[[Hallucination]]`, `[[Vector Database]]`

**Reward Model**
* **Category:** Reinforcement Learning
* **Definition:** A component in reinforcement learning (especially RLHF) that is trained to predict which of two responses a human would prefer. This model then acts as a proxy for human feedback to guide the main model's training.
* **Analogy:** It's a "judge" that has studied thousands of previous competition results to learn the preferences of the head judge (the human). It can then provide instant, automated scores to the competitor (the AI model) during practice.
* **See Also:** `[[RLHF (Reinforcement Learning from Human Feedback)]]`, `[[Reinforcement Learning]]`, `[[Q-Learning]]`

**RLHF (Reinforcement Learning from Human Feedback)**
* **Category:** Training Techniques
* **Definition:** A technique for fine-tuning language models by using human feedback to train a reward model, which is then used to optimize the language model's policy using reinforcement learning.
* **Analogy:** It's a three-step process to teach an AI to be helpful: 1) Let humans rank the AI's answers. 2) Train a "judge" AI to predict how humans would rank answers. 3) Have the main AI practice generating answers, getting instant feedback from the judge AI to improve its performance.
* **See Also:** `[[Reinforcement Learning]]`, `[[Reward Model]]`, `[[Alignment]]`

**Robustness**
* **Category:** Model Behavior
* **Definition:** The ability of an AI model to maintain its performance and provide reliable outputs even when faced with noisy, unexpected, or adversarial inputs.
* **Analogy:** A robust self-driving car is one that can still drive safely not just in perfect weather, but also in rain, snow, or when a plastic bag blows across the road (noisy/unexpected input).
* **See Also:** `[[Out-of-Distribution (OOD)]]`, `[[Adversarial Attack]]`, `[[Data Augmentation]]`

**ROUGE Score**
* **Category:** Evaluation
* **Definition:** A set of metrics used for evaluating automatic summarization and machine translation by comparing an automatically produced summary or translation against a set of reference summaries.
* **Analogy:** It grades an AI-written summary by checking how much it overlaps with summaries written by human experts. It's focused on "recall"—did the AI include all the important points?
* **See Also:** `[[Evaluation Metric]]`, `[[BLEU Score]]`, `[[Summarization]]`

## S

**Self-Attention**
* **Category:** Model Architecture
* **Definition:** A specific type of attention mechanism used in Transformer models that allows the model to weigh the importance of all other words in the input sequence when processing each word.
* **Analogy:** It's a "team meeting" for all the words in a sentence. Before any word decides on its final meaning, it looks at every other word in the sentence to understand the full context and its relationship to them.
* **See Also:** `[[Attention Mechanism]]`, `[[Transformer]]`, `[[Encoder]]`

**Sentiment Analysis**
* **Category:** Natural Language Processing (NLP)
* **Definition:** The use of natural language processing to identify, extract, and quantify the emotional tone (positive, negative, neutral) within a piece of text.
* **Analogy:** It's an AI that can read a product review and determine if the customer was happy, angry, or indifferent, without being explicitly told.
* **See Also:** `[[Natural Language Processing (NLP)]]`, `[[Classifier]]`, `[[Text Classification]]`

**Sparsity**
* **Category:** Core Concepts
* **Definition:** In the context of AI models, sparsity refers to a state where a significant portion of the model's parameters (weights) are zero. Sparse models can be more computationally efficient.
* **Analogy:** It's the difference between a dense, cluttered report and a clean, concise summary. The sparse summary has removed all the non-essential information (the zero-value weights), making it faster to read while retaining the key message.
* **See Also:** `[[Pruning]]`, `[[Mixture of Experts (MoE)]]`, `[[Model Compression]]`

**Stochastic Gradient Descent (SGD)**
* **Category:** Training Techniques
* **Definition:** A widely used variant of gradient descent that updates the model's parameters using only a single training example or a small batch of examples at each iteration, making the training process faster but more noisy.
* **Analogy:** Instead of calculating the average downhill direction from everyone in a crowd (gradient descent), you just ask one random person for directions at each step (SGD). It's less precise at any given moment, but you move much faster.
* **See Also:** `[[Gradient Descent]]`, `[[Batch Size]]`, `[[Optimizer]]`

**Superintelligence**
* **Category:** AI Concepts
* **Definition:** A hypothetical agent that possesses intelligence far surpassing that of the brightest and most gifted human minds. The potential emergence of superintelligence is a central topic in AI safety research.
* **Analogy:** The intelligence gap between a superintelligence and a human genius would be like the gap between a human genius and a housefly.
* **See Also:** `[[Artificial General Intelligence (AGI)]]`, `[[Alignment]]`, `[[AI Safety]]`

**Supervised Learning**
* **Category:** Learning Paradigms
* **Definition:** A type of machine learning where the model is trained on a dataset where both the input data and the corresponding correct outputs (labels) are provided.
* **Analogy:** It's like teaching a child to identify animals using flashcards. Each card has a picture of an animal (the input) and its name on the back (the label).
* **See Also:** `[[Unsupervised Learning]]`, `[[Reinforcement Learning]]`, `[[Classifier]]`

**Symbolic AI**
* **Category:** AI Concepts
* **Definition:** The "classic" approach to artificial intelligence, also known as Good Old-Fashioned AI (GOFAI), which is based on the human-readable representation of problems, logic, and rules.
* **Analogy:** It's like a chess program that has been explicitly programmed with all the rules of chess and strategies like "control the center of the board." It operates based on clear, logical rules.
* **See Also:** `[[Hybrid AI]]`, `[[Heuristics]]`, `[[Knowledge Graph]]`

**Synthetic Data**
* **Category:** Data Science
* **Definition:** Artificially generated data that is not collected from real-world events. It is used to augment training datasets, especially when real data is scarce, sensitive, or expensive to obtain.
* **Analogy:** It's like using a flight simulator to train pilots. The simulator (a generative model) creates realistic but artificial flying scenarios (synthetic data) to give pilots more practice without using a real plane.
* **See Also:** `[[Data Augmentation]]`, `[[GAN (Generative Adversarial Network)]]`, `[[Data Privacy]]`

## T

**Temperature**
* **Category:** Inference
* **Definition:** A hyperparameter used during inference that controls the randomness of a generative model's output. Higher temperature results in more creative and random outputs, while lower temperature leads to more focused and deterministic outputs.
* **Analogy:** It's the "creativity knob" for the AI. A low temperature is like a conservative historian sticking strictly to the facts. A high temperature is like a fantasy novelist taking creative liberties and inventing new possibilities.
* **See Also:** `[[Inference]]`, `[[Hyperparameter]]`, `[[Top-K Sampling]]`

**Tensor**
* **Category:** Core Concepts
* **Definition:** A multi-dimensional array of numerical data, which is the fundamental data structure used in deep learning frameworks. A 0D tensor is a scalar, a 1D tensor is a vector, a 2D tensor is a matrix, and so on.
* **Analogy:** Tensors are the "building blocks" of data in AI, like different types of LEGOs. You have a single dot (scalar), a line of dots (vector), a flat square of dots (matrix), and a 3D cube of dots (3D tensor).
* **See Also:** `[[Frameworks (AI)]]`, `[[TensorFlow]]`, `[[PyTorch]]`

**TensorFlow**
* **Category:** Frameworks (AI)
* **Definition:** A free and open-source software library for machine learning and artificial intelligence, developed by Google. It provides a comprehensive ecosystem of tools for building and deploying ML models.
* **Analogy:** It's a massive, all-inclusive workshop for building AI. It provides all the power tools, raw materials, and instruction manuals you need to construct anything from a simple model to a complex, industrial-scale system.
* **See Also:** `[[PyTorch]]`, `[[Frameworks (AI)]]`, `[[Tensor]]`

**Throughput**
* **Category:** Evaluation
* **Definition:** A measure of how many requests or data points a model can process in a given amount of time. It's a key metric for measuring the efficiency of an AI system in a production environment.
* **Analogy:** It's the "number of customers a cashier can serve per hour." A system with high throughput can handle a large volume of traffic without slowing down.
* **See Also:** `[[Latency]]`, `[[Inference]]`, `[[Scalability]]`

**Tokenization**
* **Category:** Natural Language Processing (NLP)
* **Definition:** The process of breaking down a piece of text into smaller units called "tokens." These tokens can be words, sub-words, or characters, and they are the basic units of input for a language model.
* **Analogy:** It's like dicing vegetables before you cook. You take a whole sentence (the carrot) and chop it up into smaller, manageable pieces (the tokens) that the model can easily digest.
* **See Also:** `[[Tokenizer]]`, `[[Embeddings]]`, `[[Natural Language Processing (NLP)]]`

**Tool Use**
* **Category:** AI Concepts
* **Definition:** The ability of an AI model, particularly an agent, to use external tools—such as a calculator, a search engine, or an API—to augment its capabilities and answer questions it cannot solve on its own.
* **Analogy:** It's like a person who, when asked a tough math problem, knows they should pull out a calculator instead of trying to solve it in their head. The AI learns to recognize when it needs help and which tool to use.
* **See Also:** `[[Agent (AI Agent)]]`, `[[API (Application Programming Interface)]]`, `[[Reasoning]]`

**TPU (Tensor Processing Unit)**
* **Category:** Hardware
* **Definition:** An AI accelerator application-specific integrated circuit (ASIC) developed by Google specifically for neural network machine learning. They are designed to perform high-volume, low-precision computation with high efficiency.
* **Analogy:** If a GPU is a versatile workshop full of general-purpose power tools, a TPU is a custom-made, single-purpose machine designed to do one specific task (tensor calculations) with unbelievable speed and efficiency.
* **See Also:** `[[GPU (Graphics Processing Unit)]]`, `[[Compute]]`, `[[Hardware Acceleration]]`

**Training**
* **Category:** Core Concepts
* **Definition:** The process of teaching a machine learning model by feeding it large amounts of data. During training, the model adjusts its internal parameters to minimize the error (loss) between its predictions and the correct answers.
* **Analogy:** It's the "study" phase for the AI. The model reviews vast amounts of material (data), takes practice tests (makes predictions), and learns from its mistakes (updates weights via backpropagation) until it masters the subject.
* **See Also:** `[[Inference]]`, `[[Supervised Learning]]`, `[[Backpropagation]]`

**Transfer Learning**
* **Category:** Training Techniques
* **Definition:** A machine learning method where a model developed for one task is reused as the starting point for a model on a second, related task. This leverages the knowledge gained from the first task to improve performance on the second.
* **Analogy:** It's like a musician who has already mastered the piano learning to play the organ. They don't start from scratch; they transfer their knowledge of keys, scales, and music theory, making the new learning process much faster.
* **See Also:** `[[Fine-Tuning]]`, `[[Pre-training]]`, `[[Foundation Model]]`

**Transformer**
* **Category:** Model Architecture
* **Definition:** A groundbreaking deep learning architecture that relies on the attention mechanism. It processes all input tokens simultaneously and learns the context and relationships between them, making it highly effective for language tasks.
* **Analogy:** Unlike older models that read a sentence one word at a time like a person reading a book, the Transformer reads the entire sentence all at once, allowing it to see the "big picture" and understand how every word relates to every other word instantly.
* **See Also:** `[[Attention Mechanism]]`, `[[Self-Attention]]`, `[[Encoder]]`, `[[Decoder]]`

## U

**Underfitting**
* **Category:** Training Challenges
* **Definition:** A modeling error that occurs when a model is too simple to capture the underlying patterns in the training data, resulting in poor performance on both the training data and new data.
* **Analogy:** It's like trying to fit a complex, curvy line with a simple, straight ruler. The ruler (the model) is too simple to represent the true shape of the data.
* **See Also:** `[[Overfitting]]`, `[[Bias-Variance Tradeoff]]`, `[[Model Complexity]]`

**Unsupervised Learning**
* **Category:** Learning Paradigms
* **Definition:** A type of machine learning where the model is trained on data that has not been labeled or categorized. The model's task is to find hidden patterns, structures, or relationships within the data on its own.
* **Analogy:** It's like giving a person a box of mixed LEGO bricks without any instructions and asking them to sort them into logical groups. They might group them by color, shape, or size, discovering the underlying patterns themselves.
* **See Also:** `[[Supervised Learning]]`, `[[Clustering]]`, `[[Generative AI]]`

## V

**Vanishing Gradient Problem**
* **Category:** Training Challenges
* **Definition:** A difficulty encountered when training deep neural networks where the gradients (error signals) become extremely small as they are propagated backward from the output layer, making it very difficult for the earlier layers to learn.
* **Analogy:** It's like a message being whispered down a very long line of people. By the time it reaches the person at the beginning of the line, the whisper is so faint that the message is lost, and they can't make any corrections.
* **See Also:** `[[Exploding Gradient Problem]]`, `[[Residual Connection]]`, `[[Backpropagation]]`

**Vector Database**
* **Category:** Data Structures
* **Definition:** A specialized database designed to store and query high-dimensional vectors, such as those produced by embedding models. It enables efficient similarity searches to find the "nearest neighbors" to a given query vector.
* **Analogy:** It's a library designed specifically for storing maps. When you bring in a new map coordinate (a query vector), it can instantly find all the other landmarks (data vectors) that are located closest to that point.
* **See Also:** `[[Embeddings]]`, `[[Retrieval-Augmented Generation (RAG)]]`, `[[Similarity Search]]`

**Vectorization**
* **Category:** Data Science
* **Definition:** The process of converting non-numerical data, such as text or images, into a numerical format (vectors or matrices) that machine learning models can understand and process.
* **Analogy:** It's the process of turning the abstract concept of a "word" into a specific coordinate on a map. This allows a computer, which understands numbers, to see which words are "close" to each other in meaning.
* **See Also:** `[[Embeddings]]`, `[[Tokenization]]`, `[[Data Preprocessing]]`

**Vision-Language Model (VLM)**
* **Category:** Model Types
* **Definition:** A type of multimodal AI model that is trained to understand and process both visual information (images, videos) and textual information, and to find relationships between them.
* **Analogy:** It's an AI that can look at a picture of a dog catching a frisbee and not only identify the objects but also generate a caption that describes the action: "A happy golden retriever leaps to catch a red frisbee in a park."
* **See Also:** `[[Multimodal Model]]`, `[[Computer Vision]]`, `[[Natural Language Processing (NLP)]]`

## W

**Weight Decay**
* **Category:** Training Techniques
* **Definition:** A regularization technique that works by adding a penalty to the loss function that is proportional to the magnitude of the model's weights. This encourages the model to use smaller, simpler weights, which helps prevent overfitting.
* **Analogy:** It's like a "tax" on large, complex solutions. The model is penalized for having large weights, pushing it to find a simpler, more elegant solution that is less likely to be overfitted to the training data.
* **See Also:** `[[Regularization]]`, `[[Overfitting]]`, `[[Loss Function]]`

**Weights**
* **Category:** Neural Network Components
* **Definition:** The learnable parameters within a neural network that are adjusted during the training process. A weight determines the strength and sign of the connection between two neurons.
* **Analogy:** Weights are the "tuning knobs" of the neural network. During training, the model carefully adjusts these knobs to amplify or reduce the importance of various signals, learning which inputs are most important for making a correct prediction.
* **See Also:** `[[Neural Network]]`, `[[Backpropagation]]`, `[[Parameter]]`

**Word2Vec**
* **Category:** Model Types
* **Definition:** A classic technique for generating word embeddings. It's a model that learns to represent words as vectors in a way that captures their semantic relationships based on their context in a large corpus of text.
* **Analogy:** It's a model that reads millions of sentences and learns that words like "coffee," "tea," and "juice" often appear in similar contexts (e.g., "I drank a cup of ___."). It then places their vectors close together in its "map of meaning."
* **See Also:** `[[Embeddings]]`, `[[Natural Language Processing (NLP)]]`, `[[Latent Space]]`

## X

**XGBoost**
* **Category:** Model Types
* **Definition:** An optimized and highly efficient implementation of the gradient boosting algorithm. It is a powerful and popular ensemble learning method, especially for structured or tabular data.
* **Analogy:** It's like building an all-star team of decision trees. It starts with one weak tree and then sequentially adds new trees that are specifically trained to correct the mistakes made by the previous ones, resulting in a very powerful and accurate final team.
* **See Also:** `[[Decision Tree]]`, `[[Random Forest]]`, `[[Ensemble Learning]]`

## Z

**Zero-Shot Learning**
* **Category:** Learning Paradigms
* **Definition:** The ability of a model to perform a task without having received any specific training examples for that task. It achieves this by leveraging its general knowledge and reasoning abilities.
* **Analogy:** It's like asking a person who has seen horses and rhinos, but never a unicorn, to draw a "horse with a horn." They can combine their existing knowledge to successfully complete the new task without ever having seen an example.
* **See Also:** `[[Few-Shot Learning]]`, `[[One-Shot Learning]]`, `[[In-context Learning]]`