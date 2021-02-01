import React from 'react'
import db from '../../db.json'
import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativesForm'
import BackLinkArrow from '../../src/components/BackLinkArrow'

function ResultWidget({results}) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>Você acerto 
           {' '}
{/*          {results.reduce((somatoriaAtual, resulAtual) => {
            const isAcerto = resultAtual === true;
            if(isAcerto){
              return somatoriaAtual + 1
            }
            return somatoriaAtual
        }, 0)} */}
         {results.filter((x) => x).length}
        {' '}  
          Perguntas</p>
        <ul>
          { results.map((result, index) => (
            <li key={`result__${result}`}>
              #{' ' + index + 1} {' '} Pergunta: {' '} 
              {result === true ? 'Acertou' : 'Errou'}
            </li>
            ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}


function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, addResult}) {
  
  const questionId = `question__${questionIndex}`
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const isCorrect = selectedAlternative === question.answer
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const hasAlternativeSelect = selectedAlternative !== undefined

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true)
            setTimeout(()=>{
              addResult(isCorrect)
              onSubmit();
              setIsQuestionSubmited(false)
              setSelectedAlternative(undefined)          
            }, 3* 1000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            
            const alternativeId = `alternative__${alternativeIndex}`            
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
            const isSelected = selectedAlternative === alternativeIndex

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={ isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none'}}               
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelect}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou</p>}{/*se foi submetido e o isCorrect === True exibe você acertou */}
          {isQuestionSubmited && !isCorrect && <p>Você errou</p>}{/*se foi submetido e o isCorrect === False exibe você errou */}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [results, setResults] = React.useState([])

  function addResult(result){
    setResults([...results, result])
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results = {results} />}
      </QuizContainer>
    </QuizBackground>
  );
}