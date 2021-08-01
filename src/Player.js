import React, { useState, useEffect } from "react";

const deckofCards = "https://deckofcardsapi.com/api/deck/new/";

const Player = () => {
  const [card, setCard] = useState([]);
  const [cardDeck, setCardDeck] = useState({});

  useEffect(() => {
    fetch(deckofCards)
      .then((res) => res.json())
      .then((data) => {
        setCardDeck({
          id: data.deck_id,
          remaining: data.remaining
        });
      });
  }, []);

  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/${cardDeck.id}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        const cardList = [];
        for (let i = 0; i < data.length; i++) {
          let cardHand = data[i];
          cardList.push(cardHand[0]);
        }
      });
  }, [cardDeck.id]);

  const drawCard = (cardList) => {
    setCard.push(cardList);
  };

  return (
    <div>
      <button onclick={drawCard}>DRAW CARD</button>
      <div>{JSON.stringify(cardDeck)}</div>
      <div>{JSON.stringify(card)}</div>
      <div
        style={{
          display: "flex",
          flexwrap: "wrap",
          flexDirection: "row",
          width: "100%"
        }}
      ></div>
      {/*This is where the image will go*/}
    </div>
  );
};
/*
    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=1`)
        .then(res => {
            return res.blob()
        }).then(data => {
            setCard(data.images)
        })
    }, [setCard]);

    const onBtnClick = (deckApi) => {
        const url = `https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=1`;
        fetch(url)
        .then(res => {
          return res.json()
        }).then( res => {
            setCard(res.data);
        })
        };
    */

export default Player;
