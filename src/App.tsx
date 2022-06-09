import * as React from 'react';
import styles from './style.module.css';

export interface Post {
  id: number | null;
  title: string | null;
  text: string | null;
}

export default function App() {
  const [index, setIndex] = React.useState<number>(1);
  const [post, setPost] = React.useState<Post>({
    id: null,
    title: null,
    text: null,
  });

  
  //GET THE FUNCTION THAT HAS THE FETCH
  React.useEffect(() => {
      getPostBanner(index);
  }, [index]);


  //CREATE FUNCTION THAT GETS THE NUMBER OF THE POST INDEX AND WILL SHOW THE CORRESPONDANT POST TEXT
  // POSTNUMBER IS USED TO GET THE INDEX NUMBER
  function getPostBanner (postNumber: number): void{
    postNumber = postNumber < 1 ? 1 : postNumber;
    // CREATE FETCH
    fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
      .then((res) => res.json())
      .then((res) => {
        setPost({ id: res.id, title: res.title, text: res.body });
      console.log(postNumber);
      });
  }


  return (
    <div className={styles.container}>
      {/* card container */}
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <h2 className={styles['card__title']}>{post?.title}</h2>
          <p className={styles['card__text']}>{post?.text}</p>
          <p style={{ color: 'grey' }} className={styles['card__text']}>
            Post number: #{post?.id}
          </p>
        </div>
      </div>
      {/* Card Actions */}
      <div className={styles['card__actions']}>
        {/* Btn decrease */}
        <button
          className={styles['btn--decrease']}
          onClick={() => setIndex(index - 1)}
        >
          Decrease
        </button>
        {/* Btn increase */}
        <button
          className={styles['btn--increase']}
          onClick={() => setIndex(index + 1)}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
