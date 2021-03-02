import styled from 'styled-components'

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://github.com/7h14go/" target="_blank">
        <img src="https://images.vexels.com/media/users/3/150845/isolated/preview/333bdf231eba2185ef3e211bb541c09f-iacute-cone-de-fones-de-ouvido-by-vexels.png" alt="Logo Fones de ouvido"/>
      </a>
      <p>
        Orgulhosamente criado por
        {' '}
        
        {' '}
        <a href="https://github.com/7h14go/" target="_blank">
          <span>Thiago</span>
        </a>
      </p>
    </FooterWrapper>
  );
}