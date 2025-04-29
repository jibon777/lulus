const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

// Fungsi Fisher-Yates untuk mengacak array
function shuffleArray(input) {
  if (!Array.isArray(input)) return [];
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fungsi untuk filter soal unik berdasarkan text pertanyaan
function getUniqueQuestions(arr) {
  const seen = new Set();
  return arr.filter((q) => {
    if (seen.has(q.question)) return false;
    seen.add(q.question);
    return true;
  });
}


const questions = [
  {
    question: 'What is the cloud?',
    options: [
      'A Google product for computing large amounts of data.',
      'A Google product made up of on-premises IT infrastructure.',
      'A metaphor for a network of data centers.',
      'A metaphor for the networking capability of internet providers.'
    ],
    answer:'A metaphor for a network of data centers.',
 },
  {
    question: 'What is the benefit of implementing a transformation cloud that is based on open infrastructure?',
    options: [
      'Open source software makes it easier to patent proprietary software.',
      'Open source software reduces the chance of vendor lock-in.',
      'On-premises software isn\'t open source, so cloud applications are more portable.',
      'Open standards make it easier to hire more developers.'
    ],
    answer: 'Open source software reduces the chance of vendor lock-in.',
  },
  {
    question: 'An organization has a new application, and user subscriptions are growing faster than on-premises infrastructure can handle. What benefit of the cloud might help them in this situation?',
    options: [
      'It provides physical access, so the organization can deploy servers faster.',
      'It\'s cost effective, so the organization will no longer have to pay for computing once the app is in the cloud.',
      'It\'s secure, so the organization won\'t have to worry about the new subscribers data.',
      'It\'s scalable, so the organization could shorten their infrastructure deployment time.'
    ],
    answer: 'It\'s scalable, so the organization could shorten their infrastructure deployment time.',
  },
  {
    question: 'What is seen as a limitation of on-premises infrastructure, when compared to cloud infrastructure?',
    options: [
      'The on-premises networking is more complicated.',
      'The on-premises hardware procurement process can take a long time.',
      'Scaling processing is too difficult due to power consumption.',
      'Maintenance workers do not have physical access to the servers.'
    ],
    answer: 'The on-premises hardware procurement process can take a long time.',
  },
  {
    question: 'Which item describes a goal of an organization seeking digital transformation?',
    options: [
      'Streamline their hardware procurement process to forecast at least a quarter into the future.',
      'Ensure better security by decoupling teams and their data.',
      'Break down data silos and generate real time insights.',
      'Reduce emissions by using faster networks in their on-premises workloads.'
    ],
    answer: 'Break down data silos and generate real time insights.',
  },
  {
    question: 'Select the two capabilities that form the basis of a transformation cloud? Select two correct answers.',
    options: [
      'Open infrastructure gives the freedom to innovate by running applications in the place that makes the most sense.',
      'Data cloud provides a unified solution to manage data across the entire data lifecycle.',
      'A trusted cloud gives control of all resources to the user to ensure high availability at all times.',
      'Collaboration cloud ensures that the device a user connects with only works on the corporate network.',
      'Sustainable cloud ensures the costs of cloud resources are controlled to prevent budget overrun.',
    ],
    answer: [
      'Open infrastructure gives the freedom to innovate by running applications in the place that makes the most sense.',
      'Data cloud provides a unified solution to manage data across the entire data lifecycle.',
    ],
  },
  {
    question: 'As the world and business changes, organizations have to decide between embracing new technology and transforming, or keeping their technology and approaches the same. What risks might an organization face by not transforming as their market evolves?',
    options: [
      'Embracing new technology can cause organizations to overspend on innovation.',
      'Focusing on why they operate can lead to inefficient use of resources and disruption.',
      'Focusing on how they operate can prevent organizations from seeing transformation opportunities.',
      'Organizations risk losing market leadership if they spend too much time on digital transformation.'
    ],
    answer: 'Focusing on how they operate can prevent organizations from seeing transformation opportunities.',
  },
  {
    question: 'Select the definition of digital transformation.',
    options: [
      'When an organization uses new digital technologies to create or modify business processes, culture, and customer experiences.',
      'When an organization uses new digital technologies to create or modify on-premises business processes.',
      'When an organization uses new digital technologies to create or modify technology infrastructure to focus on cost saving.',
      'When an organization uses new digital technologies to create or modify financial models for how a business is run.'
    ],
    answer: 'When an organization uses new digital technologies to create or modify business processes, culture, and customer experiences.',
  },
  {
    question: 'An organization has made significant investments in their own infrastructure and has regulatory requirements for their data to be hosted on-premises. Which cloud implementation would best suit their needs?',
    options: [
      'Private Cloud',
      'Software as a service',
      'Public Cloud',
      'Platform as a service'
    ],
    answer: 'Private Cloud',
  },
  {
    question: 'An organization has shifted from a CapEx to OpEx based spending model. Which of these statements is true?',
    options: [
      'They will only pay for what they forecast.',
      'Hardware procurement is done by a centralized team.',
      'Budgeting will only happen on an annual basis.',
      'They will only pay for what they use.'
    ],
    answer: 'They will only pay for what they use.'
  },
  {
    question: 'An organization wants to innovate using the latest technologies, but also has compliance needs that specify data must be stored in specific locations. Which cloud approach would best suit their needs?',
    options: [
      'Multicloud',
      'On-premises infrastructure',
      'Hybrid Cloud',
      'Public Cloud'
    ],
    answer: 'Hybrid Cloud'
  },
  {
    question: 'Which network performance metric describes the amount of data a network can transfer in a given amount of time?',
    options: [
      'Bandwidth',
      'Domain Name System (DNS)',
      'Latency',
      'Fiber optics'
    ],
    answer: 'Bandwidth'
  },
  {
    question: 'An organization wants to ensure they have redundancy of their resources so their application remains available in the event of a disaster. How can they ensure this happens?',
    options: [
      'By assigning a different IP address to each resource.',
      'Using the edge network to cache the whole application image in a backup.',
      'By putting resources in different zones.',
      'By putting resources in the Domain Name System (DNS).'
    ],
    answer: 'By putting resources in different zones.'
  },
  {
    question: 'A financial services organization has bank branches in a number of countries, and has built an application that needs to run in different configurations based on the local regulations of each country. How can cloud infrastructure help achieve this goal?',
    options: [
      'Total cost of ownership of the infrastructure.',
      'Reliability of the infrastructure availability.',
      'Flexibility of infrastructure configuration.',
      'Scalability of infrastructure to needs.'
    ],
    answer: 'Flexibility of infrastructure configuration.'
  },
  {
    question: 'Which cloud computing service model offers a develop-and-deploy environment to build cloud applications?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)',
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)'
    ],
    answer: 'Platform as a Service (PaaS)'
  },
  {
    question: 'An organization wants to move to cloud-based collaboration software, but due to limited IT staff one of their main drivers is having low maintenance needs. Which cloud computing model would best suit their requirements?',
    options: [
      'Software as a Service (SaaS)',
      'IT as a service (ITaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)'
    ],
    answer: 'Software as a Service (SaaS)'
  },
  {
    question: 'In the cloud computing shared responsibility model, what types of content are customers always responsible for, regardless of the computing model chosen?',
    options: [
      'The customer is responsible for all infrastructure decisions, server configurations and database monitoring.',
      'The customer is responsible for security of the operating system, software stack required to run their applications and any hardware, networks, and physical security.',
      'The customer is responsible for securing anything that they create within the cloud, such as the configurations, access policies, and user data.',
      'The customer is not responsible for any of the data in the cloud, as data management is the responsibility of the cloud provider who is hosting the data.'
    ],
    answer: 'The customer is responsible for securing anything that they create within the cloud, such as the configurations, access policies, and user data.'
  },
  {
    question: 'Which option best describes a benefit of Infrastructure as a Service (IaaS)?',
    options: [
      'It has low management overhead, as all administration and management tasks for data, servers, storage, and updates are handled by the cloud vendor.',
      'It’s efficient, as IaaS resources are available when needed and resources aren’t wasted by overbuilding capacity.',
      'It reduces development time, as developers can go straight to coding instead of spending time setting up and maintaining a development environment.',
      'It\'s cost-effective, as all infrastructure costs are handled under a single monthly or annual subscription fee.'
    ],
    answer: 'It’s efficient, as IaaS resources are available when needed and resources aren’t wasted by overbuilding capacity.'
  },
    {
    question: 'Which step in the data value chain is where collected raw data is transformed into a form that’s ready to derive insights from?',
    options: [
      'Data storage',
      'Data processing',
      'Data genesis',
      'Data analysis'
    ],
    answer: 'Data processing'
  },
  {
    question: 'Which represents the proprietary customer datasets that a business collects from customer or audience transactions and interactions?',
    options: [
      'Third-party data',
      'First-party data',
      'Second-party data',
      'Fourth-party data'
    ],
    answer: 'First-party data'
  },
  {
    question: 'Which data type is highly organized and well-defined?',
    options: [
      'A hybrid of structured, semi-structured, and unstructured data',
      'Structured data',
      'Unstructured data',
      'Semi-structured data'
    ],
    answer: 'Structured data'
  },
  {
    question: 'What is data governance?',
    options: [
      'The process of deleting unnecessary data to save storage space',
      'The process of setting internal data policies and ensuring compliance with external standards',
      'The process of analyzing data to gain insights and make informed decisions',
      'The process of collecting and storing data for future use'
    ],
    answer: 'The process of setting internal data policies and ensuring compliance with external standards'
  },
  {
    question: 'Which is a repository designed to ingest, store, explore, process, and analyze any type or volume of raw data, regardless of the source?',
    options: [
      'Data warehouse',
      'Data lake',
      'Database',
      'Data archive'
    ],
    answer: 'Data lake'
  },
  {
    question: 'New cloud tools make it possible to harness the potential of unstructured data. Which of these use cases best demonstrates this?',
    options: [
      'Using GPS coordinates to power a ride-sharing app',
      'Analyzing social media posts to identify sentiment toward a brand',
      'Analyzing historical sales figures to predict future trends',
      'Creating visualizations from seasonal weather data'
    ],
    answer: 'Analyzing social media posts to identify sentiment toward a brand'
  },
  {
    question: 'What is Google Cloud’s modern and serverless data warehousing solution?',
    options: [
      'Vertex AI',
      'BigQuery',
      'Compute Engine',
      'Cloud Storage'
    ],
    answer: 'BigQuery'
  },
  {
    question: 'A car insurance company has a large database that stores customer details, including the vehicles they own and past claims. The structure of the database means that information is stored in tables, rows, and columns. What type of database is this?',
    options: [
      'A non-relational database',
      'An object database',
      'An XML database',
      'A relational database'
    ],
    answer: 'A relational database'
  },
  {
    question: 'A solar energy company wants to analyze weather data to better understand the seasonal impact on their business. On which platform could they find free-to-use weather datasets?',
    options: [
      'Google Play',
      'Google Cloud console',
      'App Engine',
      'Google Cloud Marketplace'
    ],
    answer: 'Google Cloud Marketplace'
  },
  {
    question: 'An online retailer uses a smart analytics tool to ingest real-time customer behavior data to surface the best suggestions for particular users. How can machine learning guide this activity?',
    options: [
      'Through machine learning, with every click that the user makes, their website experience becomes increasingly personalized.',
      'Machine learning can help identify user behavior in real time, but cannot make personalized suggestions based on the data.',
      'Through machine learning, a user’s credit card transactions can be analyzed to determine regular purchases.',
      'Machine learning can be used to make all users see the same product recommendations, regardless of their preferences or behavior.'
    ],
    answer: 'Through machine learning, with every click that the user makes, their website experience becomes increasingly personalized.'
  },
  {
    question: 'A data analyst for an online retailer must produce a sales report at the end of each quarter. Which Cloud Storage class should the retailer use for data accessed every 90 days?',
    options: [
      'Coldline',
      'Nearline',
      'Standard',
      'Archive'
    ],
    answer: 'Coldline'
  },
  {
    question: 'Data in the form of video, pictures, and audio recordings is well suited to object storage. Which product is best for storing this kind of data?',
    options: [
      'Cloud Storage',
      'Cloud SQL',
      'Firestore',
      'BigQuery'
    ],
    answer: 'Cloud Storage'
  },
  {
    question: 'Which is the best SQL-based storage option for a transactional workload that requires local or regional scalability?',
    options: [
      'Cloud Storage',
      'Spanner',
      'Bigtable',
      'Cloud SQL'
    ],
    answer: 'Cloud SQL'
  },
  {
    question: 'BigQuery works in a multicloud environment. How do organizations benefit from this feature?',
    options: [
      'Data teams can eradicate data silos by analyzing data across multiple cloud providers.',
      'Multicloud support in BigQuery is only intended for use in disaster recovery scenarios.',
      'BigQuery lets organizations save costs by limiting the number of cloud providers they use.',
      'Security is more effective when BigQuery is run in on-premises environments.'
    ],
    answer: 'Data teams can eradicate data silos by analyzing data across multiple cloud providers.'
  },
  {
    question: 'Which characteristic is true for all Cloud Storage classes?',
    options: [
      'Accessibility only within one region',
      'High latency and low durability',
      'Geo-redundancy if data is stored in a multi-region or dual-region',
      'Maximum storage limits'
    ],
    answer: 'Geo-redundancy if data is stored in a multi-region or dual-region'
  },
  {
    question: 'Which strategy describes when databases are migrated from on-premises and private cloud environments to the same type of database hosted by a public cloud provider?',
    options: [
      'Lift and shift',
      'Remain on-premises',
      'Refactoring',
      'Managed database migration'
    ],
    answer: 'Lift and shift'
  },
  {
    question: 'What is Google\'s big data database service that powers many core Google services, including Google Search, Google Analytics, Google Maps Platform, and Gmail?',
    options: [
      'Cloud SQL',
      'Bigtable',
      'Spanner',
      'Cloud Storage'
    ],
    answer: 'Bigtable'
  },
  {
    question: 'Which would be the best SQL-based storage option for a transactional workload that requires global scalability?',
    options: [
      'Cloud SQL',
      'Bigtable',
      'Firestore',
      'Spanner'
    ],
    answer: 'Spanner'
  },
  {
    question: 'What are the two services that BigQuery provides?',
    options: [
      'Networking and storage',
      'Storage and analytics',
      'Compute and analytics',
      'Migration and analytics'
    ],
    answer: 'Storage and analytics'
  },
  {
    question: 'Which Google Cloud product can be used to synchronize data across databases, storage systems, and applications?',
    options: [
      'Datastream',
      'Dataproc',
      'Pub/Sub',
      'Dataprep'
    ],
    answer: 'Datastream'
  },
  {
    question: 'Which statement is true about Dataflow?',
    options: [
      'It allows easy data cleaning and transformation through visual tools and machine learning-based suggestions.',
      'It’s a messaging service for receiving messages from various device streams.',
      'It’s a cloud-based data warehouse for storing and analyzing streaming and batch data.',
      'It handles infrastructure setup and maintenance for processing pipelines.'
    ],
    answer: 'It handles infrastructure setup and maintenance for processing pipelines.'
  },
  {
    question: 'What is Google Cloud’s distributed messaging service that can receive messages from various device streams such as gaming events, Internet of Things (IoT) devices, and application streams?',
    options: [
      'Looker',
      'Dataplex',
      'Dataproc',
      'Pub/Sub'
    ],
    answer: 'Pub/Sub'
  },
  {
    question: 'What feature of Looker makes it easy to integrate into existing workflows and share with multiple teams at an organization?',
    options: [
      'It’s 100% web based.',
      'It creates easy to understand visualizations.',
      'It’s cost effective.',
      'It supports over 60 different SQL databases.'
    ],
    answer: 'It’s 100% web based.'
  },
  {
    question: 'What does ETL stand for in the context of data processing?',
    options: [
      'Extract, transform, and load',
      'Enrichment, tagging, and labeling',
      'Event-time logic',
      'Enhanced transaction logic'
    ],
    answer: 'Extract, transform, and load'
  },
  {
    question: 'What Google Cloud business intelligence platform is designed to help individuals and teams analyze, visualize, and share data?',
    options: [
      'Dataflow',
      'Cloud Storage',
      'Dataplex',
      'Looker'
    ],
    answer: 'Looker'
  },
  {
    question: 'Streaming analytics is the processing and analyzing of data records continuously instead of in batches. Which option is a source of streaming data?',
    options: [
      'Temperature sensors',
      'Medical test results',
      'Customer email addresses',
      'Payroll records'
    ],
    answer: 'Temperature sensors'
  },
  {
    question: 'Which dimension for measuring data quality means that the data conforms to a set of predefined standards and definitions such as type and format?',
    options: [
      'Uniqueness',
      'Accuracy',
      'Consistency',
      'Validity'
    ],
    answer: 'Validity'
  },
  {
    question: 'How do data analytics and business intelligence differ from AI and ML?',
    options: [
      'Data analytics and business intelligence are used only in small businesses, whereas AI and ML are used exclusively by large corporations.',
      'Data analytics and business intelligence use automated decision-making processes, whereas AI and ML require human intervention and interpretation of data.',
      'Data analytics and business intelligence involve advanced algorithms for predicting future trends, whereas AI and ML focus on processing historical data.',
      'Data analytics and business intelligence identify trends from historical data, whereas AI and ML use data to make decisions for future business.'
    ],
    answer: 'Data analytics and business intelligence identify trends from historical data, whereas AI and ML use data to make decisions for future business.'
  },
  {
    question: 'Google applies generative AI to products like Google Workspace, but what is generative AI?',
    options: [
      'A type of artificial intelligence that can make decisions and take actions.',
      'A type of artificial intelligence that can understand and respond to human emotions.',
      'A type of artificial intelligence that can create and sustain its own consciousness.',
      'A type of artificial intelligence that can produce new content, including text, images, audio, and synthetic data.'
    ],
    answer: 'A type of artificial intelligence that can produce new content, including text, images, audio, and synthetic data.'
  },
  {
    question: 'Which technology relies on models to analyze large amounts of data, learn from the insights, and then make predictions and informed decisions?',
    options: [
      'Robotics',
      'Machine learning',
      'Expert systems',
      'Natural language processing'
    ],
    answer: 'Machine learning'
  },
  {
    question: 'Which use case demonstrates ML’s ability to process natural language?',
    options: [
      "Identifying the artist, title, or genre of a song to create playlists based on the user's listening habits.",
      'Detecting people and objects in surveillance footage to use as evidence in criminal cases.',
      'Segmenting images into different parts or regions to extract information, such as the text on a sign.',
      'Identifying the topic and sentiment of customer email messages so that they can be routed to the relevant department.'
    ],
    answer: 'Identifying the topic and sentiment of customer email messages so that they can be routed to the relevant department.'
  },
  {
    question: 'You’re watching a video on YouTube and are shown a list of videos that YouTube thinks you are interested in. What ML solution powers this feature?',
    options: [
      'Clickbait detection',
      'Personalized recommendations',
      'Content moderation',
      'Video transcription'
    ],
    answer: 'Personalized recommendations'
  },
  {
    question: 'Which option refers to the use of technologies to build machines and computers that can mimic cognitive functions associated with human intelligence?',
    options: [
      'Deep learning',
      'Natural language processing',
      'Machine learning',
      'Artificial intelligence'
    ],
    answer: 'Artificial intelligence'
  },
  {
    question: 'Google\'s AI principles are a set of guiding values that help develop and use artificial intelligence responsibly. Which of these is one of Google’s AI principles?',
    options: [
      'AI should create or reinforce unfair bias.',
      'AI should be socially beneficial.',
      'AI should be accountable to other machines.',
      'AI should be made available for any use.'
    ],
    answer: 'AI should be socially beneficial.'
  },
  {
    question: 'What does the consistency dimension refer to when data quality is being measured?',
    options: [
      'Whether a dataset is free from duplicate values that could prevent an ML model from learning accurately.',
      'Whether the data is up-to-date and reflects the current state of the phenomenon that is being modeled.',
      'Whether the data is uniform and doesn’t contain any contradictory information.',
      'Whether all the required information is present.'
    ],
    answer: 'Whether the data is uniform and doesn’t contain any contradictory information.'
  },
  {
    question: 'Which dimension for measuring data quality means that the data conforms to a set of predefined standards and definitions such as type and format?',
    options: [
      'Uniqueness',
      'Accuracy',
      'Consistency',
      'Validity'
    ],
    answer: 'Validity'
  },
  {
    question: 'How do data analytics and business intelligence differ from AI and ML?',
    options: [
      'Data analytics and business intelligence are used only in small businesses, whereas AI and ML are used exclusively by large corporations.',
      'Data analytics and business intelligence use automated decision-making processes, whereas AI and ML require human intervention and interpretation of data.',
      'Data analytics and business intelligence involve advanced algorithms for predicting future trends, whereas AI and ML focus on processing historical data.',
      'Data analytics and business intelligence identify trends from historical data, whereas AI and ML use data to make decisions for future business.'
    ],
    answer: 'Data analytics and business intelligence identify trends from historical data, whereas AI and ML use data to make decisions for future business.'
  },
  {
    question: 'Google applies generative AI to products like Google Workspace, but what is generative AI?',
    options: [
      'A type of artificial intelligence that can make decisions and take actions.',
      'A type of artificial intelligence that can understand and respond to human emotions.',
      'A type of artificial intelligence that can create and sustain its own consciousness.',
      'A type of artificial intelligence that can produce new content, including text, images, audio, and synthetic data.'
    ],
    answer: 'A type of artificial intelligence that can produce new content, including text, images, audio, and synthetic data.'
  },
  {
    question: 'Which technology relies on models to analyze large amounts of data, learn from the insights, and then make predictions and informed decisions?',
    options: [
      'Robotics',
      'Machine learning',
      'Expert systems',
      'Natural language processing'
    ],
    answer: 'Machine learning'
  },
  {
    question: 'Which use case demonstrates ML’s ability to process natural language?',
    options: [
      "Identifying the artist, title, or genre of a song to create playlists based on the user's listening habits.",
      'Detecting people and objects in surveillance footage to use as evidence in criminal cases.',
      'Segmenting images into different parts or regions to extract information, such as the text on a sign.',
      'Identifying the topic and sentiment of customer email messages so that they can be routed to the relevant department.'
    ],
    answer: 'Identifying the topic and sentiment of customer email messages so that they can be routed to the relevant department.'
  },
  {
    question: 'You’re watching a video on YouTube and are shown a list of videos that YouTube thinks you are interested in. What ML solution powers this feature?',
    options: [
      'Clickbait detection',
      'Personalized recommendations',
      'Content moderation',
      'Video transcription'
    ],
    answer: 'Personalized recommendations'
  },
  {
    question: 'Which option refers to the use of technologies to build machines and computers that can mimic cognitive functions associated with human intelligence?',
    options: [
      'Deep learning',
      'Natural language processing',
      'Machine learning',
      'Artificial intelligence'
    ],
    answer: 'Artificial intelligence'
  },
  {
    question: 'Google\'s AI principles are a set of guiding values that help develop and use artificial intelligence responsibly. Which of these is one of Google’s AI principles?',
    options: [
      'AI should create or reinforce unfair bias.',
      'AI should be socially beneficial.',
      'AI should be accountable to other machines.',
      'AI should be made available for any use.'
    ],
    answer: 'AI should be socially beneficial.'
  },
  {
    question: 'What does the consistency dimension refer to when data quality is being measured?',
    options: [
      'Whether a dataset is free from duplicate values that could prevent an ML model from learning accurately.',
      'Whether the data is up-to-date and reflects the current state of the phenomenon that is being modeled.',
      'Whether the data is uniform and doesn’t contain any contradictory information.',
      'Whether all the required information is present.'
    ],
    answer: 'Whether the data is uniform and doesn’t contain any contradictory information.'
  },
  {
    question: 'Artificial intelligence is best suited for replacing or simplifying rule-based systems. Which is an example of this in action?',
    options: [
      'Using a reinforcement learning algorithm to train autonomous drones for package delivery.',
      'Using AI to replace a human decision-maker in complex situations, such as those involving life-or-death choices.',
      'Training a machine learning model to predict a search result ranking.',
      'Implementing AI to develop a new product or service that has never been seen before.'
    ],
    answer: 'Using a reinforcement learning algorithm to train autonomous drones for package delivery.'
  },
  [
    {
      question: 'Which Google Cloud AI solution is designed to help businesses improve their customer service?',
      options: [
        'Discovery AI for Retail',
        'Document AI',
        'Cloud Talent Solution',
        'Contact Center AI'
      ],
      answer: 'Contact Center AI'
    },
    {
      question: 'Which Google Cloud AI solution is designed to help businesses automate document processing?',
      options: [
        'Document AI',
        'Cloud Talent Solution',
        'Contact Center AI',
        'Discovery AI for Retail'
      ],
      answer: 'Document AI'
    },
    {
      question: 'Google Cloud offers four options for building machine learning models. Which is best when a business wants to code their own machine learning environment, the training, and the deployment?',
      options: [
        'Custom training',
        'AutoML',
        'BigQuery ML',
        'Pre-trained APIs'
      ],
      answer: 'Custom training'
    },
    {
      question: 'Which feature of Vertex AI lets users build and train end-to-end machine learning models by using a GUI (graphical user interface), without writing a line of code.',
      options: [
        'AutoML',
        'Managed ML environment',
        'Custom training',
        'MLOps'
      ],
      answer: 'AutoML'
    },
    {
      question: 'A large media company wants to improve how they moderate online content. Currently, they have a team of human moderators that review content for appropriateness, but are looking to leverage artificial intelligence to improve efficiency. Which of Google’s pre-trained APIs could they use to identify and remove inappropriate content from the media company\'s website and social media platforms.',
      options: [
        'Video Intelligence API',
        'Speech-to-Text API',
        'Vision API',
        'Natural Language API'
      ],
      answer: 'Natural Language API'
    },
    {
      question: 'What’s the name of Google’s application-specific integrated circuit (ASIC) that is used to accelerate machine learning workloads?',
      options: [
        'Tensor Processing Unit (TPU)',
        'Vertex Processing Unit (VPU)',
        'Central Processing Unit (CPU)',
        'Graphic Processing Unit (GPU)'
      ],
      answer: 'Tensor Processing Unit (TPU)'
    },
    {
      question: 'An online retailer wants to help users find specific products faster on their website. One idea is to allow shoppers to upload an image of the product they’re looking to purchase. Which of Google’s pre-trained APIs could the retailer use to expand this functionality?',
      options: [
        'Natural Language API',
        'Vision API',
        'Video Intelligence API',
        'Speech-to-Text API'
      ],
      answer: 'Vision API'
    },
    {
      question: 'BigQuery ML is a machine learning service that lets users:',
      options: [
        'Build and evaluate machine learning models in BigQuery by using SQL.',
        'Seamlessly connect with a data science team to create an ML model.',
        'Export small amounts of data to spreadsheets or other applications.',
        'Build and evaluate machine learning models in BigQuery by using Python and Java.'
      ],
      answer: 'Build and evaluate machine learning models in BigQuery by using SQL.'
    },
    {
      "question": "App Engine, Cloud Functions and Cloud Run are all what type of Google Cloud compute option?",
      "options": [
        "Software computing",
        "Serverless computing",
        "Hybrid computing",
        "VM-based computing"
      ],
      "answer": "Serverless computing"
    },
    {
      "question": "What do containers recreate or virtualize?",
      "options": [
        "Operating systems",
        "Virtual machines",
        "Hypervisor",
        "Hardware"
      ],
      "answer": "Operating systems"
    },
    {
      "question": "Aarav is a Chief Technical Officer and is considering using public cloud services, specifically to modernize their company’s IT infrastructure. Which of the following can Aarav use to build a business case for using an Infrastructure-as-a-Service (IaaS) solution?",
      "options": [
        "Web application security is managed by the cloud provider.",
        "IT expenditure shifts from operational to capital.",
        "Computer hardware shifts from hybrid to on-premises.",
        "Maintenance work is outsourced to the cloud provider."
      ],
      "answer": "Maintenance work is outsourced to the cloud provider."
    },
    {
      "question": "Which specific cloud computing feature helps businesses serve their customers without service interruption and in a cost-effective way?",
      "options": [
        "Elasticity",
        "On-demand service",
        "Large Network Access",
        "Agility"
      ],
      "answer": "Elasticity"
    },
    {
      "question": "A national hotel chain is using a combination of on-premises data centers and public cloud services for their IT infrastructure. What type of IT infrastructure model is this?",
      "options": [
        "Virtualization",
        "Hybrid cloud",
        "Colocation",
        "Multi-cloud"
      ],
      "answer": "Hybrid cloud"
    },
    {
      question: 'The technology team of a pharmaceutical business decides to adopt an automated continuous integration and deployment (CI/CD) approach. What is the primary value of using a CI/CD approach for the overall business?',
      options: [
        'It allows developers to build using APIs.',
        'It prevents infrastructure failures and downtime.',
        'It improves security of services and solutions.',
        'It increases application release velocity and reliability.'
      ],
      answer: 'It increases application release velocity and reliability.'
    },
    {
      question: 'What is App Engine?',
      options: [
        'An application for visibility and management into backend software platforms.',
        'A platform for managing the software and infrastructure required to run your code.',
        'An application for powering the hardware and data services for scalable features.',
        'A platform for building scalable web applications and mobile backends.'
      ],
      answer: 'A platform for building scalable web applications and mobile backends.'
    },
    {
      question: 'A financial services firm wants to migrate an existing application to the cloud but doesn’t want to risk service downtime. For this reason, they have chosen to opt for redundancy and build a new application in the cloud while continuing to run their old application on-premises. Which standard pattern of cloud migration describes this scenario?',
      options: [
        'Move then change',
        'Change then move',
        'Invent in brownfield',
        'Invent in greenfield'
      ],
      answer: 'Invent in brownfield'
    },
    {
      question: 'Sajid is a developer for an online apparel retail company. What kind of architecture should he use for the applications he develops, and why?',
      options: [
        'Monolithic pattern, because it’s modular and therefore easy to update.',
        'Microservice pattern, because it’s modular and therefore easy to update.',
        'API gateway pattern, because it’s modular and therefore easy to update.',
        'Client-server pattern, because it’s modular and therefore easy to update.'
      ],
      answer: 'Microservice pattern, because it’s modular and therefore easy to update.'
    },
    {
      question: 'What is Google Kubernetes Engine (GKE)?',
      options: [
        'An open-source virtual machine (VM) integration system.',
        'A Google Cloud managed service for virtual machine (VM) integration.',
        'An open-source container-orchestration system.',
        'A Google Cloud managed service for container orchestration.'
      ],
      answer: 'A Google Cloud managed service for container orchestration.'
    },
    {
      question: 'What is the function of APIs?',
      options: [
        'They provide real-time analytics.',
        'They offer hybrid data storage.',
        'They enable integration between systems.',
        'They enable rapid autoscaling of data.'
      ],
      answer: 'They enable integration between systems.'
    },
    {
      question: 'Michelle wants to manage her team\'s APIs and provide security policies for identity verification, authentication, and access control. What Google Cloud solution should she choose?',
      options: [
        'BigQuery',
        'Google Kubernetes Engine',
        'Apigee',
        'Cloud Identity'
      ],
      answer: 'Apigee'
    },
    {
      question: 'Why do legacy systems struggle to meet modern consumer expectations?',
      options: [
        'They rapidly surpass physical capacity.',
        'They only serve real-time data.',
        'They scale slowly.',
        'They ineffectively process batch data.'
      ],
      answer: 'They scale slowly.'
    },
    {
      question: 'What is a critical outcome of API management?',
      options: [
        'Measuring and tracking business performance.',
        'Updating and repairing outdated business components.',
        'Digitizing and modernizing siloed business data.',
        'Distributing and creating regular new business features.'
      ],
      answer: 'Measuring and tracking business performance.'
    },
    {
      question: 'How can businesses use APIs to unlock value from their legacy systems?',
      options: [
        'By gaining access to data stored in legacy systems.',
        'By re-architecting their legacy systems.',
        'By monitoring cloud resource usage of new applications.',
        'By analyzing data from new applications.'
      ],
      answer: 'By gaining access to data stored in legacy systems.'
    }
  ],
  {
    question: 'Which cybersecurity threat demands a ransom payment from a victim to regain access to their files and systems?',
    options: [
      'Ransomware',
      'Trojan',
      'Virus',
      'Spyware'
    ],
    answer: 'Ransomware'
  },
  {
    question: 'Which definition best describes a firewall?',
    options: [
      'A security model that assumes no user or device can be trusted by default',
      'A software program that encrypts data to make it unreadable to unauthorized users',
      'A set of security measures designed to protect a computer system or network from cyber attacks',
      'A network security device that monitors and controls incoming and outgoing network traffic based on predefined security rules'
    ],
    answer: 'A network security device that monitors and controls incoming and outgoing network traffic based on predefined security rules'
  },
  {
    question: 'Which cloud security principle ensures that security practices and measures align with established standards and guidelines?',
    options: [
      'Compliance',
      'Integrity',
      'Control',
      'Confidentiality'
    ],
    answer: 'Compliance'
  },
  {
    question: 'Which cybersecurity threat occurs when errors arise during the setup of resources, inadvertently exposing sensitive data and systems to unauthorized access?',
    options: [
      'Malware',
      'Phishing',
      'Configuration mishaps',
      'Virus'
    ],
    answer: 'Configuration mishaps'
  },
  {
    question: 'Which is a benefit of cloud security over traditional on-premises security?',
    options: [
      'Large upfront capital investment.',
      'Only having to install security updates on a weekly basis.',
      'Increased scalability.',
      'Having physical access to hardware.'
    ],
    answer: 'Increased scalability.'
  },
  {
    question: 'Which three essential aspects of cloud security form the foundation of the CIA triad?',
    options: [
      'Confidentiality, integrity, and availability',
      'Certificates, intelligence, and authentication',
      'Containers, infrastructure, and architecture',
      'Compliance, identity, and access management'
    ],
    answer: 'Confidentiality, integrity, and availability'
  },
  {
    question: 'Which cloud security principle relates to keeping data accurate and trustworthy?',
    options: [
      'Integrity',
      'Control',
      'Compliance',
      'Confidentiality'
    ],
    answer: 'Integrity'
  },
  {
    question: 'Which security principle advocates granting users only the access they need to perform their job responsibilities?',
    options: [
      'Security by default',
      'Zero-trust architecture',
      'Least privilege',
      'Privileged access'
    ],
    answer: 'Least privilege'
  },
  {
    question: 'What common cybersecurity threat involves tricking users into revealing sensitive information or performing actions that compromise security?',
    options: [
      'Malware',
      'Configuration mishap',
      'Ransomware',
      'Phishing'
    ],
    answer: 'Phishing'
  },
  {
    question: 'Which is the responsibility of the cloud provider in a cloud security model?',
    options: [
      'Maintaining the customer\'s infrastructure.',
      'Configuring the customer\'s applications.',
      'Managing the customer\'s user access.',
      'Securing the customer\'s data.'
    ],
    answer: 'Maintaining the customer\'s infrastructure.'
  },
  {
    question: 'What Google Cloud product provides robust protection from harmful distributed denial-of-service (DDoS) attacks?',
    options: [
      'Cloud Monitoring',
      'Google Cloud Armor',
      'Cloud Load Balancing',
      'IAM'
    ],
    answer: 'Google Cloud Armor'
  },
  {
    question: 'What security feature adds an extra layer of protection to cloud-based systems?',
    options: [
      'Two-step verification (2SV)',
      'Data loss prevention (DLP)',
      'Firewall as a service (FaaS)',
      'Security information and event management (SIEM)'
    ],
    answer: 'Two-step verification (2SV)'
  },
  {
    question: 'Select the correct statement about Identity and Access Management (IAM).',
    options: [
      'IAM is a cloud service that encrypts cloud-based data at rest and in transit.',
      'IAM provides granular control over who has access to Google Cloud resources and what they can do with those resources.',
      'IAM is a system that detects and prevents malicious traffic from entering a cloud network.',
      'IAM is a cloud security information and event management solution that collects and analyzes log data from cloud security devices and applications.'
    ],
    answer: 'IAM provides granular control over who has access to Google Cloud resources and what they can do with those resources.'
  },
  {
    question: 'What metric does Google Cloud use to measure the efficiency of its data centers to achieve cost savings and a reduced carbon footprint?',
    options: [
      'Total cost of ownership (TCO)',
      'Energy Efficiency Ratio (EER)',
      'Power Usage Effectiveness (PUE)',
      'Data Center Infrastructure Efficiency (DCiE)'
    ],
    answer: 'Power Usage Effectiveness (PUE)'
  },
  {
    question: 'Which aspect of cloud identity management verifies the identity of users or systems?',
    options: [
      'Authentication',
      'Authorization',
      'Accounting',
      'Auditing'
    ],
    answer: 'Authentication'
  },
  {
    question: 'Which practice involves a combination of processes and technologies that help reduce the risk of data breaches, system outages, and other security incidents in the cloud?',
    options: [
      'Security operations (SecOps)',
      'Site reliability engineering (SRE)',
      'Zero trust security',
      'Cloud security posture management (CSPM)'
    ],
    answer: 'Security operations (SecOps)'
  },
  {
    question: 'Google Cloud encrypts data at various states. Which state refers to when data is being actively processed by a computer?',
    options: [
      'Data in use',
      'Data in transit',
      'Data at rest',
      'Data lake'
    ],
    answer: 'Data in use'
  },
  {
    question: 'Which is a powerful encryption algorithm trusted by governments and businesses worldwide?',
    options: [
      'Post-quantum cryptography (PQC)',
      'Advanced Encryption Standard (AES)',
      'Lattice-Based Cryptography (LBC)',
      'Isomorphic encryption (IE)'
    ],
    answer: 'Advanced Encryption Standard (AES)'
  },
  {
    question: "Which is one of Google Cloud’s seven trust principles?",
    options: [
      "Google sells customer data to third parties.",
      "We give \"backdoor\" access to government entities when requested.",
      "Google Cloud uses customer data for advertising.",
      "All customer data is encrypted by default."
    ],
    answer: "All customer data is encrypted by default."
  },
  {
    question: "Which term describes the concept that data is subject to the laws and regulations of the country where it resides?",
    options: [
      "Data sovereignty",
      "Data redundancy",
      "Data consistency",
      "Data residency"
    ],
    answer: "Data sovereignty"
  },
  {
    question: "Which report provides a way for Google Cloud to share data about how the policies and actions of governments and corporations affect privacy, security, and access to information?",
    options: [
      "Security reports",
      "Billing reports",
      "Compliance reports",
      "Transparency reports"
    ],
    answer: "Transparency reports"
  },
  {
    question: "Which Google Cloud feature allows users to control their data's physical location?",
    options: [
      "Districts",
      "Places",
      "Areas",
      "Regions"
    ],
    answer: "Regions"
  },
  {
    question: "Where can you find details about certifications and compliance standards met by Google Cloud?",
    options: [
      "Compliance resource center",
      "Cloud Storage client libraries",
      "Google Cloud console",
      "Marketplace"
    ],
    answer: "Compliance resource center"
  },
  {
    question: 'Which Google Cloud tool lets you estimate how changes to cloud usage will affect costs?',
    options: [
      'Cloud Billing',
      'Cloud Monitoring',
      'Google Cloud Pricing Calculator',
      'Cloud Trace'
    ],
    answer: 'Google Cloud Pricing Calculator'
  },
  {
    question: 'Why is it a benefit that the Google Cloud resource hierarchy follows inheritance and propagation rules?',
    options: [
      'Faster propagation can simplify a cloud migration.',
      'Inheritance in the hierarchy reduces the overall cost of cloud computing.',
      'Resources at lower levels can improve the performance of cloud applications.',
      'Permissions set at higher levels of the resource hierarchy are automatically inherited by lower-level resources.'
    ],
    answer: 'Permissions set at higher levels of the resource hierarchy are automatically inherited by lower-level resources.'
  },
  {
    question: 'Which feature lets you set limits on the amount of resources that can be used by a project or user?',
    options: [
      'Invoicing limits',
      'Billing reports',
      'Quota policies',
      'Committed use discounts'
    ],
    answer: 'Quota policies'
  },
  {
    question: 'Which feature lets you set alerts for when cloud costs exceed a certain limit?',
    options: [
      'Cost optimization recommendations',
      'Billing reports',
      'Cost forecasting',
      'Budget threshold rules'
    ],
    answer: 'Budget threshold rules'
  },
  {
    question: 'Which offers a reactive method to help you track and understand what you’ve already spent on Google Cloud resources and provide ways to help optimize your costs?',
    options: [
      'Cloud billing reports',
      'Resource usage',
      'Cost forecasting',
      'Google Cloud Pricing Calculator'
    ],
    answer: 'Cloud billing reports'
  },
  {
    question: 'Which represents the lowest level in the Google Cloud resource hierarchy?',
    options: [
      'Folders',
      'Projects',
      'Resources',
      'Organization node'
    ],
    answer: 'Resources'
  },
  {
    question: 'Which term describes a centralized hub within an organization composed of a partnership across finance, technology, and business functions?',
    options: [
      'Center of innovation',
      'Competency center',
      'Hub center',
      'Center of excellence'
    ],
    answer: 'Center of excellence'
  },
  {
    question: 'Whose job is to ensure the reliability, availability, and efficiency of software systems and services deployed in the cloud?',
    options: [
      'Cloud architect',
      'Site reliability engineer',
      'Cloud security engineer',
      'DevOps engineer'
    ],
    answer: 'Site reliability engineer'
  },
  {
    question: 'Why is escalating a support ticket not always the best course of action when trying to resolve an issue?',
    options: [
      'It can increase the monthly cost of support plans.',
      'It can result in increased power consumption, impacting carbon neutrality.',
      'It may disrupt the workflow of the Customer Care team and lead to delays in other cases.',
      'It may reduce the number of available virtual machines.'
    ],
    answer: 'It may disrupt the workflow of the Customer Care team and lead to delays in other cases.'
  },
  {
    question: 'One of the four golden signals is latency. What does latency measure?',
    options: [
      'How many requests reach a system.',
      'How long it takes for a particular part of a system to return a result.',
      'System failures or other issues.',
      'How close to capacity a system is.'
    ],
    answer: 'How long it takes for a particular part of a system to return a result.'
  },
  {
    question: 'Google Cloud Observability provides a comprehensive set of monitoring, logging, and diagnostics tools. Which tool collects latency data from applications and provides insights into how they’re performing?',
    options: [
      'Cloud Profiler',
      'Cloud Trace',
      'Cloud Logging',
      'Cloud Monitoring'
    ],
    answer: 'Cloud Trace'
  },
  {
    question: 'Which metric shows how well a system or service is performing?',
    options: [
      'Service level agreements',
      'Service level contracts',
      'Service level objectives',
      'Service level indicators'
    ],
    answer: 'Service level indicators'
  },
  {
    question: 'Which of these measures should be automated on a regular basis and stored in geographically separate locations to allow for rapid recovery from disasters or failures?',
    options: [
      'Inventory data',
      'Security patches',
      'Backups',
      'Log files'
    ],
    answer: 'Backups'
  },
  {
    question: 'What does the Cloud Profiler tool do?',
    options: [
      'It counts, analyzes, and aggregates the crashes in running cloud services in real-time.',
      'It provides a comprehensive view of your cloud infrastructure and applications.',
      'It collects and stores all application and infrastructure logs.',
      'It identifies how much CPU power, memory, and other resources an application uses.'
    ],
    answer: 'It identifies how much CPU power, memory, and other resources an application uses.'
  },
  {
    question: 'How does replication help the design of resilient and fault-tolerant infrastructure and processes in a cloud environment?',
    options: [
      'It creates multiple copies of data or services and distributes them across different servers or locations.',
      'It monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
      'It duplicates critical components or resources to provide backup alternatives.',
      'It scales infrastructure to handle varying workloads and accommodate increased demand.'
    ],
    answer: 'It creates multiple copies of data or services and distributes them across different servers or locations.'
  },
  {
    question: 'Which Google Cloud Customer Care support level is designed for enterprises with critical workloads and features the fastest response time?',
    options: [
      'Premium Support',
      'Basic Support',
      'Enhanced Support',
      'Standard Support'
    ],
    answer: 'Premium Support'
  },
  {
    question: 'What sustainability goal does Google aim to achieve by the year 2030?',
    options: [
      'To be the first major company to achieve 100% renewable energy.',
      'To be the first major company to run its own wind farm.',
      'To be the first major company to operate completely carbon free.',
      'To be the first major company to be carbon neutral.'
    ],
    answer: 'To be the first major company to operate completely carbon free.'
  },
  {
    question: 'Kaluza is an electric vehicle smart-charging solution. How does it use BigQuery and Looker Studio?',
    options: [
      'It uses BigQuery and Looker Studio to containerize workloads.',
      'It uses BigQuery and Looker Studio to build and deploy machine learning models.',
      'It uses BigQuery and Looker Studio to create dashboards that provide granular operational insights.',
      'It uses BigQuery and Looker Studio to comply with government regulations.'
    ],
    answer: 'It uses BigQuery and Looker Studio to create dashboards that provide granular operational insights.'
  }
];


// Endpoint untuk soal
app.get('/questions', (req, res) => {
  if (!Array.isArray(questions)) {
    return res.status(500).json({ error: 'Soal tidak tersedia' });
  }

  // 1. Filter soal unik
  const unique = getUniqueQuestions(questions);

  // 2. Acak urutan soal dan pilihan jawaban
  const shuffled = shuffleArray(unique).map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));

  res.setHeader('Content-Type', 'application/json');
  res.json(shuffled);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});