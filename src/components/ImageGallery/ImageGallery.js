import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import pixabayApi from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import Spiner from '../Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    loading: false,
    status: Status.IDLE,
    showModal: false,
    largeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const imageName = this.props.imageName;
    const page = this.state.page;

    if (prevName !== imageName) {
      this.setState({ status: Status.PENDING });

      pixabayApi
        .fetchImage(imageName, page)
        .then(data => {
          if (data.hits.length > 0) {
            this.setState({
              images: data.hits,
              status: Status.RESOLVED,
            });
          } else {
            this.setState({ status: Status.REJECTED });
          }
        })
        .catch(error => {
          this.setStatesetState({ error, status: Status.REJECTED });
        });
    } else if (prevState.page !== page && page !== 1) {
      this.setState({ loading: true });

      pixabayApi
        .fetchImage(imageName, page)
        .then(data => {
          this.setState(prev => ({
            images: [...prev.images, ...data.hits],
            status: Status.RESOLVED,
          }));
          this.props.pageScroll();
        })
        .catch(() => this.setState({ status: Status.REJECTED }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleClickButton = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = largeImageURL => {
    this.setState({ largeImg: largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, status, loading, largeImg, showModal } = this.state;

    if (status === 'idle') {
      return <h2 className={s.Title}>Waiting for search name</h2>;
    }

    if (status === 'pending') {
      return <Spiner />;
    }

    if (status === 'rejected') {
      return <h2 className={s.Title}>Something was wrong please try again!</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onImageClick={this.onImageClick}
                />
              );
            })}
          </ul>
          {loading && <Spiner />}
          {images.length >= 12 && (
            <Button handleClickButton={this.handleClickButton} />
          )}
          {showModal && (
            <Modal toggleModal={this.toggleModal} largeImg={largeImg}></Modal>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string,
  pageScroll: PropTypes.func,
};
