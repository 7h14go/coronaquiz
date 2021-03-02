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
import Link from '../src/components/Link'
import {motion} from 'framer-motion'




export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')
  

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
      <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration:0.5 }}
          variants={{
            show:{opacity: 1, y: '0'},
            hidden:{opacity: 0, y: '100%'}
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration:0.5 }}
          variants={{
            show:{opacity: 1},
            hidden:{opacity: 0}
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>            
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.')
                return(
                  <li key={linkExterno}>
                    <Widget.Topic 
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.footer}
          transition={{ delay: 0.5, duration:0.5 }}
          variants={{
            show:{opacity: 1},
            hidden:{opacity: 0}
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/7h14go" />
      </QuizBackground>
  )
}
