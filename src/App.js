import React, { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(() => setError('Gagal memuat pertanyaan.'));
  }, []);

  const handleAnswer = (answer) => {
    if (isAnswered || !questions[currentQuestion]) return;
    
    let correctAnswers = questions[currentQuestion]?.answer || [];
    if (!Array.isArray(correctAnswers)) correctAnswers = [correctAnswers];
    
    if (userAnswer.includes(answer)) {
      setUserAnswer(userAnswer.filter((ans) => ans !== answer));
      setError('');
    } else {
      if (correctAnswers.length === 0) {
        setError('Tidak ada jawaban yang bisa dipilih.');
        return;
      }
      if (userAnswer.length < correctAnswers.length) {
        setUserAnswer([...userAnswer, answer]);
        setError('');
      } else {
        setError(`Anda hanya dapat memilih ${correctAnswers.length} jawaban.`);
      }
    }
  };

  const checkAnswer = () => {
    if (!questions[currentQuestion]) return;
    let correctAnswers = questions[currentQuestion]?.answer || [];
    if (!Array.isArray(correctAnswers)) correctAnswers = [correctAnswers];
    
    if (userAnswer.length !== correctAnswers.length) {
      setError(`Anda harus memilih ${correctAnswers.length} jawaban.`);
      return;
    }
    
    const isCorrect = userAnswer.every((ans) => correctAnswers.includes(ans)) &&
                      correctAnswers.every((ans) => userAnswer.includes(ans));
    
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
    
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (!isAnswered) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer([]);
      setIsAnswered(false);
      setError('');
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Kuis Pilihan Ganda</h1>
      {!isFinished ? (
        <>
          <h3>Jumlah Soal: {questions.length}</h3>
          <h3>Skor: {correctCount}/{questions.length}</h3>
          {questions.length > 0 && questions[currentQuestion] && (
            <div>
              <h2>{questions[currentQuestion]?.question}</h2>
              {questions[currentQuestion]?.instruction && <p>{questions[currentQuestion]?.instruction}</p>}
              <div>
                {questions[currentQuestion]?.options?.map((option, index) => {
                  const optionLetter = String.fromCharCode(65 + index);
                  let correctAnswers = questions[currentQuestion]?.answer || [];
                  if (!Array.isArray(correctAnswers)) correctAnswers = [correctAnswers];
                  const isCorrect = correctAnswers.includes(option);
                  const isSelected = userAnswer.includes(option);
                  
                  let backgroundColor = '';
                  let textColor = 'black';
                  let fontWeight = 'normal';
                  
                  if (isAnswered) {
                    if (isCorrect) {
                      backgroundColor = 'green';
                      fontWeight = 'bold';
                    } else if (isSelected) {
                      backgroundColor = 'red';
                      textColor = 'white';
                    }
                  } else {
                    backgroundColor = isSelected ? '#17a2b8' : '';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      style={{
                        backgroundColor,
                        color: textColor,
                        display: 'flex',
                        alignItems: 'center',
                        margin: '10px auto',
                        padding: '10px 20px',
                        fontSize: '16px',
                        width: '80%',
                        cursor: isAnswered ? 'not-allowed' : 'pointer',
                        borderRadius: '5px',
                        border: '2px solid #ccc',
                        fontWeight,
                      }}
                      disabled={isAnswered}
                    >
                      <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{optionLetter}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!isAnswered && (
                <button onClick={checkAnswer} disabled={userAnswer.length === 0} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                  Konfirmasi Jawaban
                </button>
              )}
              {isAnswered && (
                <button onClick={nextQuestion} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                  Pertanyaan Selanjutnya
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Kuis Selesai!</h2>
          <h3>Skor Akhir: {correctCount}/{questions.length}</h3>
          <h3>Persentase Benar: {((correctCount / questions.length) * 100).toFixed(2)}%</h3>
          <h3>Persentase Salah: {((wrongCount / questions.length) * 100).toFixed(2)}%</h3>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Mulai Lagi
          </button>
        </>
      )}
    </div>
  );
}

export default App;
