import styles from './CoursesSection.module.css';

const COURSES = [
  { title: 'PYTHON for AI & ML', duration: '4 Weeks', level: '🟢 Beginner Friendly • All Levels', levelColor: '#10b981', price: '₹299', syllabus: ['Python Fundamentals & OOPs Concepts', 'NumPy (Arrays, Multi-dimensional math)', 'Pandas (DataFrames, Cleansing, Analysis)', 'Data Visualization (Matplotlib & Seaborn)', 'Live Lectures + Lifetime Recording Access', '10+ Coding Assignments & PDF Notes'], projects: ['Student Performance Predictor', 'Movie Rating & Sentiment Analyser'], outcome: 'Ready to clean data, build custom tools, and transition directly into Machine Learning. Includes completion certificate.' },
  { title: 'MACHINE LEARNING Fundamentals', duration: '6 Weeks', level: '🔵 Intermediate Level', levelColor: '#818cf8', price: '₹499', syllabus: ['Supervised & Unsupervised Learning', 'Regression (Linear, Logistic, Polynomial)', 'Classification (Decision Trees, Random Forest, SVM)', 'Clustering (K-Means, Hierarchical)', 'Model Tuning (Hyperparameters, Cross-Validation)', 'Scikit-Learn library and Math fundamentals'], projects: ['Real Estate House Price Predictor', 'Engineering College Placement Predictor', 'E-Commerce Customer Segmentation'], outcome: 'Build, deploy, and evaluate standard predictive models. Includes 2 Kaggle-style case studies and verified completion certificate.' },
  { title: 'DEEP LEARNING', duration: '6 Weeks', level: '🟣 Intermediate to Advanced', levelColor: '#a78bfa', price: '₹599', syllabus: ['Artificial Neural Networks (ANN) & Perceptrons', 'Activation Functions (Sigmoid, Tanh, ReLU, Softmax)', 'Backpropagation & Mathematical Gradients', 'TensorFlow 2.x & Keras API Architecture', 'Model Optimization (Adam, RMSProp, Dropout)', 'GPU Cloud Setup & Google Colab configuration'], projects: ['Multi-class Fashion Image Classifier', 'MNIST Handwritten Digit Recognizer', 'Custom Neural Network Visualizer'], outcome: 'Design neural network architectures from scratch. Fully prepare for computer vision, NLP, and generic deep learning tasks. Includes certificate.' },
  { title: 'CNN MASTERY', duration: '4 Weeks', level: '🔴 Advanced Level', levelColor: '#ef4444', price: '₹499', syllabus: ['Image Processing Pipelines with OpenCV', 'Convolution, Max-Pooling & Flattening Layers', 'Computer Vision Architectures & VGG/ResNet', 'Transfer Learning with pre-trained models', 'Real-time Detection workflows using webcams', 'Data Augmentation & Overfitting mitigation'], projects: ['Real-time Face Mask Detection', 'Webcam-based Emotion Recognition System', 'Leaf-based Plant Disease Diagnostic App'], outcome: 'Design and train Convolutional Neural Networks for vision systems. Deploy OpenCV detectors locally. Includes certification.' },
  { title: 'GENERATIVE AI', duration: '4 Weeks', level: '🟢 Beginner to Intermediate', levelColor: '#10b981', price: '₹399', syllabus: ['LLM Architecture: ChatGPT, Gemini & Claude', 'Prompt Engineering (Few-shot, CoT, System prompts)', 'Vector DBs & Embeddings (ChromaDB, Pinecone)', 'RAG (Retrieval-Augmented Generation) setups', 'API key management, rates & costing limits', 'Fine-tuning LLM APIs and temperature metrics'], projects: ['Custom RAG Chatbot over PDF / Docs', 'Automated SEO-optimized Article Generator'], outcome: 'Build functional text processing pipelines and chatbot systems using top AI APIs. Includes community portal access and certificate.' },
  { title: 'AI AGENTS', duration: '4 Weeks', level: '🔴 Advanced Level', levelColor: '#ef4444', price: '₹699', syllabus: ['LangChain Framework: Agents, Tools & Memory', 'CrewAI Multi-Agent System orchestration', 'Autonomous Decision-Making loops', 'ReAct Framework implementation details', 'Tool Bindings (Google Search, Python Exec, File Ops)', 'Agent Guardrails, Token usage optimization & costs'], projects: ['Autonomous Market & Stock Research Agent', 'Multi-Agent Customer Support Auto-Responder Crew'], outcome: 'Design and coordinate multiple autonomous AI agents that collaborate to solve complex business operations. Includes certificate.' },
];

const ENROLL_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd9rJsC5I7Dw0x78-1VSuQAoBed7g2KXBibvUFZTDfKv3mYZQ/viewform?usp=dialog';

export default function CoursesSection() {
  return (
    <section className={styles.coursesSection} id="courses-section">
      <div className="container">
        <div className="section-header">
          <h2>AI Specialization Programs</h2>
          <p>Focused, high-impact training tracks led by Shubham Narute to build your AI engineer skillset.</p>
        </div>

        <div className={styles.coursesGrid}>
          {COURSES.map((course, idx) => (
            <div className={styles.courseCard} key={idx}>
              <div className={styles.courseHeader}>
                <span className={styles.durationBadge}>{course.duration}</span>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <span className={styles.levelBadge} style={{ color: course.levelColor }}>{course.level}</span>
              </div>

              <div className={styles.courseBody}>
                <div className={styles.tutorBadge}>
                  <img src="/mentor.jpg" alt="Shubham Narute" className={styles.tutorAvatar} />
                  <span>Tutor: Shubham Narute</span>
                  <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem' }}>✓</span>
                </div>

                <div>
                  <h4 className={styles.subtitle}>Syllabus Highlights</h4>
                  <ul className={styles.learnList}>
                    {course.syllabus.map((item, i) => (
                      <li key={i}>
                        <svg style={{ width: 16, height: 16, flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.projectsSection}>
                  <span className={styles.projectsLabel}>📁 Hands-on Capstone Projects</span>
                  <ul className={styles.projectsList}>
                    {course.projects.map((p, i) => (
                      <li key={i}><span className={styles.projectDot}>●</span> {p}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.outcomeBox}>
                  <strong>Program Outcome</strong>
                  {course.outcome}
                </div>
              </div>

              <div className={styles.courseFooter}>
                <div className={styles.price}>{course.price}</div>
                <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className={styles.enrollBtn}>Enroll Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
