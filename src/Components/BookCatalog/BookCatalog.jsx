import React, { Component, Fragment } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './_BookCatalog.scss';
import BookCard from '../BookCard/BookCard';
import Genre from '../Genre/Genre';
// import Spinner from '../Spinner/Spinner';
import BackToTop from '../BackToTop/BackToTop';

class BookCatalog extends Component {
  constructor(props) {
    super(props);
    /* eslint-disable */
    this.state = {
      isNewContentLoading: false,
      displayBackToTop: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handlePageScroll, {
      capture: true,
      passive: true
    });

    window.addEventListener('load', () => {
      window.addEventListener('online',  this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handlePageScroll, false);
    window.removeEventListener('load', () => {
      window.removeEventListener('online',  this.updateOnlineStatus);
      window.removeEventListener('offline', this.updateOnlineStatus);
    });
  }


  updateOnlineStatus = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === 'online') this.setState(prevState => prevState);
  }

  handlePageScroll = () => {
    const scrollHeight = window.innerHeight + window.scrollY;
    if (scrollHeight >= 900) {
      this.setState({ displayBackToTop: true });
    }
    if (scrollHeight < 900) {
      this.setState({ displayBackToTop: false });
    }
    if (scrollHeight >= document.body.offsetHeight + 500) {
      this.setState({
        isNewContentLoading: true,
      });
    }
  };

  backToTopMethod = () => {
    return scrollToComponent(this.backToTop, {
      offset: 0,
      align: "top",
      duration: 500
    });
  };

  render() {
    const { isNewContentLoading, displayBackToTop } = this.state;
    return (
      <Fragment>
        <Genre
          ref={section => {
            this.backToTop = section;
          }}
        />
        <div className="container-content" id="main">
          <BookCard imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcXllacYqB7Mb7bS0GEv47ojAfw64qLy9cfhi2UeNdFPbbtlqF" />
          <BookCard imageUrl="" />
          <BookCard imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/DaVinciCode.jpg/220px-DaVinciCode.jpg" />
          {/* <BookCard />
          <BookCard />
          <BookCard />
          <BookCard /> */}
          <BookCard imageUrl="https://cdn.shopify.com/s/files/1/1465/9410/products/A.jpg?v=1512357326" />
          <BookCard imageUrl="http://t2.gstatic.com/images?q=tbn:ANd9GcRB16KR7ttg2VetlP7eYwmr4x8eIVWam4f1MkEhzrTNtX8oJY34"/>
          <BookCard />
          <BookCard imageUrl="https://images-na.ssl-images-amazon.com/images/I/519DnNpKA7L._SX319_BO1,204,203,200_.jpg"/>
          <BookCard imageUrl="https://images-na.ssl-images-amazon.com/images/I/51vp6JxnI3L._SX331_BO1,204,203,200_.jpg"/>
          <BookCard imageUrl="https://images-na.ssl-images-amazon.com/images/I/41J1JskPTuL._SX331_BO1,204,203,200_.jpg"/>
          <BookCard imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Inferno-cover.jpg/200px-Inferno-cover.jpg"/>
          <BookCard imageUrl="https://images-na.ssl-images-amazon.com/images/I/51ycO52en5L._SX289_BO1,204,203,200_.jpg"/>
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {isNewContentLoading && <BookCard
            imageUrl="https://m.media-amazon.com/images/M/MV5BOGQ1OTUwODUtMzg1MS00NzBkLWIxM2MtYjBmMDdmZWM1NThiXkEyXkFqcGdeQXVyNDkzNTM2ODg@._V1_.jpg"
          />}
          {/* <BookCard /> */}
        </div>
        {/* <div className="text-center">{isNewContentLoading && <Spinner />}</div> */}
        <BackToTop
          backToTopMethod={this.backToTopMethod}
          displayBackToTop={displayBackToTop}
        />
      </Fragment>
    );
  }
}

export default BookCatalog;
