import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system';
import book from '../../images/book.jpg'

function BooksList(props) {

    let cards = props.data;
    console.log(cards);

    

  return (
    <React.Fragment>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={6}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                     
                    }}
                    image={book}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {card.label}
                    </Typography>   
                    <Typography>
                      Author : {card.author}
                      
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                    {/* {(card.assigned) ? <Button size="small" disabled>Assigned</Button> : <Button size="small">Assign</Button>} */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </React.Fragment>
  )
}

export default BooksList