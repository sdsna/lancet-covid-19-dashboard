import { Box, Container, Paper, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import contentSizeQuery from 'helpers/contentSizeQuery'

const FooterTypography = styled(Typography).attrs({
  variant: 'body2'
})`
  && {
    color: #fff;
  }
`

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const ResponsiveGridItem = styled(Grid).attrs({
  item: true
})`
  flex-basis: ${props => props.styled.width * 100}%;
  max-width: ${props => props.styled.width * 100}%;

  ${contentSizeQuery('medium-down')`
    {
      max-width: 100%;
      flex-basis: 100%;

      text-align: center;
      &:not(:first-of-type) {
        margin-top: 16px;
      }
    }`
  }
`

const Logo = styled.img`
  height: 80px;
`

const BoxWithShadow = styled(Box)`
  box-shadow: 0px -2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)
`

const Footer = () => (
  <BoxWithShadow paddingY={4} position='relative' style={{ background: '#020722' }}>
    <Container maxWidth='lg'>
      <Grid container>
        <ResponsiveGridItem styled={{ width: 1/3 }}>
          <Logo
            alt='Logo'
            src='/static/logo.svg' style={{ height: 80, marginBottom: 8 }} />
        </ResponsiveGridItem>
        <ResponsiveGridItem styled={{ width: 2/3 }}>
          <FooterTypography gutterBottom>
            Nullam imperdiet nunc eros, quis laoreet nisi cursus at. Suspendisse
            potenti. Vivamus sed metus non metus luctus placerat. Pellentesque
            vel auctor lacus. Phasellus sit amet pellentesque lacus. Curabitur
            accumsan interdum risus vitae condimentum. Maecenas at dui dolor.
            Mauris at orci a lectus tristique efficitur ut ac sem. Nullam mattis
            varius arcu, sed placerat nisl venenatis vel. 
          </FooterTypography>
        </ResponsiveGridItem>
      </Grid>
    </Container>
  </BoxWithShadow>
)

export default Footer
