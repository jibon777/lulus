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
      'Sustainable cloud ensures the costs of cloud resources are controlled to prevent budget overrun.'
    ],
    answer: 
    'Open infrastructure gives the freedom to innovate by running applications in the place that makes the most sense.',
    'Data cloud provides a unified solution to manage data across the entire data lifecycle.',
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
    answer: 'Private Cloud'',
  },
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
