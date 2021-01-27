import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import { useRouter } from 'next/router'
import Input from '../src/components/Input'
import Button from '../src/components/Button'





export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')
  

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
      <QuizLogo />
        <Widget>
              <Widget.Header>
                <h1>The COVID-19</h1>
              </Widget.Header>
            <Widget.Content>
              <form onSubmit={function (event){
                event.preventDefault()
                                
                router.push(`/quiz?name=${name}`)
                console.log('Fazendo uma submissão por meio do react')
                
                }}>
                <Input 
                    name = 'nomeDoUsuario'
                    placeholder="Digite seu nome" 
                    onChange={ event => setName(event.target.value)}
                    value = {name}
                />              
                
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>            
            <h1>Teste2</h1>            
            <p>opaopaopaopaoa</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/7h14g0" />
      </QuizBackground>
  )
}
