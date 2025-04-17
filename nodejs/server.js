const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Daftar soal dengan pilihan ganda
const questions = [
  {
    question: 'What is the cloud?',
    options: [
      'A Google product for computing large amounts of data.',
      'A Google product made up of on-premises IT infrastructure.',
      'A metaphor for a network of data centers.',
      'A metaphor for the networking capability of internet providers.',
    ],
    answer: [
      'A metaphor for a network of data centers.',
    ],
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
      'Platform as a service',
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
      'Second-party data'
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
  }
];

// Fungsi untuk mengacak array
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Endpoint untuk mendapatkan soal dengan pilihan acak dan urutan soal acak
app.get('/questions', (req, res) => {
  // Acak urutan soal dan pilihan jawaban untuk setiap soal
  const shuffledQuestions = shuffleArray(questions).map(question => ({
    ...question,
    options: shuffleArray(question.options) // Mengacak pilihan jawaban untuk setiap soal
  }));

  res.json(shuffledQuestions);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
