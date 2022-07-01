import styles from "./Gallery.module.scss";

export const Gallery = (): JSX.Element => {
    return(
        <div className={styles.container}>
      <h2 className="heading-text">Responsive <span>image gallery</span></h2>
      <div className={styles.imageGallery}>
        <div className={styles.column}>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
        <div className="column">
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/KTVn62x6fFw" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
        <div className="column">
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/VSeVhmW4_JQ" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/07aFaTf24Kg" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/DqyYTM7pR2o" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
          <div className={styles.imageItem}>
            <img src="https://source.unsplash.com/IdNOTjPeHrE" alt="" />
            <div className="overlay"><span>Image title</span></div>
          </div>
        </div>
      </div>
    </div>
    );
}


{/* <div className={styles.container}>
<h2 className="heading-text">Responsive <span>image gallery</span></h2>
<div className={styles.imageGallery}>
  <div className={styles.column}>
    <div className={styles.imageItem}>
      <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
      <div className="overlay"><span>Image title</span></div>
    </div>
    <div className={styles.imageItem}>
      <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
      <div className="overlay"><span>Image title</span></div>
    </div>
    <div className={styles.imageItem}>
      <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
      <div className="overlay"><span>Image title</span></div>
    </div>
  </div>
  

</div>
</div> */}