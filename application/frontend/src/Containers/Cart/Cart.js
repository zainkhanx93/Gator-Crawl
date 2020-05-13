import React from 'react';
import { connect } from 'react-redux';
import LoginChecker from '../HOC/LoginChecker';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
// import gclogo from '../../Assets/Images/nike.jpg';

import * as cartActions from '../../Store/Actions/cartActions';
import './Cart.css';

class Cart extends React.Component {
   delete = (index) => {
     const { deleteBookmark } = this.props;
     console.log(index);
     console.log('delete product');
     deleteBookmark(index);
     const { bookmarks } = this.props;
     console.table(bookmarks);
   }

   getTotal = () => {
     const { bookmarks } = this.props;
     let sum = 0;
     bookmarks.map((item) => {
       console.log(item.price);
       return sum += +item.price;
     });
     return sum;
   }


   render() {
     const { history, bookmarks } = this.props;

     let mycart = <p>You do not have any bookmarks yet.</p>;
     let total = null;

     if (bookmarks && bookmarks.length > 0) {
       mycart = bookmarks.map((entry, index) => (
         <div key={index}>
           <div className="Shopping-Cart-Window">
             <div className="Product-Window">
               <div className="Cart-Product">
                 <img className="Profile-picture" src={entry.photo} alt="Logo" />
                 <div className="Cart-Product-Info">
                   <p style={{ fontSize: '25px' }}> <b>{entry.productName} </b></p>
                   <p> {entry.description}</p>
                   <p> {entry.category}</p>
                   <p style={{ fontSize: '25px' }}><b> $ {entry.price} </b> </p>
                 </div>
                 <div className="Cart-Buttons">
                   <button className="Button" type="button"> Message  </button>
                   <br />
                   <br />
                   <br />
                   <button className="Button" onClick={() => this.delete(index)} type="button"> Delete </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       ));

       total = <h1 style={{ textAlign: 'center' }}>Total: ${this.getTotal()}</h1>;
     }

     return (
       <div>
         <MainNavBar history={history} />
         <div className="Cart-Window">
           <div className="Cart-Left-Side">
             <ProfileNavBar />
           </div>
           <div className="Cart-Right-Side">
             <p className="Title"> My Shopping Cart </p>
             {total}
             {mycart}
           </div>
         </div>
       </div>
     );
   }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.cartReducer.bookmarks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBookmark: (id) => dispatch(cartActions.deleteBookmark(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Cart));
