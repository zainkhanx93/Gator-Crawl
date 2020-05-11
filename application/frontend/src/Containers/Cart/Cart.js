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
     // let product = document.getElementById('Cart-Product');
     // product.removeChild(product.childNodes[0]);
     console.log(index);
     console.log('delete product');
     deleteBookmark(index);
     const { bookmarks } = this.props;
     console.table(bookmarks);
   }
   //  product.removeChild(product.childNodes[0]);

   render() {
     const { history, bookmarks } = this.props;

     let mycart = <p>You do not have any bookmarks yet.</p>;
     if (bookmarks.length > 0) {
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
     }
     // mycart = (
     //   <div>
     //     <div className="Shopping-Cart-Window">
     //       <div className="Product-Window">
     //
     //         <div className="Cart-Product">
     //           <img className="Profile-picture" src={gclogo} alt="Logo" />
     //           <div className="Cart-Product-Info">
     //             <p style={{ fontSize: '25px' }}> <b> Nike Shoes </b></p>
     //             <p> Size 9 Roshis </p>
     //             <p style={{ fontSize: '25px' }}><b> $ 200.00 </b> </p>
     //           </div>
     //           <div className="Cart-Buttons">
     //             <button className="Button" type="button"> Message  </button>
     //             <br />
     //             <br />
     //             <br />
     //             <button className="Button" onClick={this.delete} type="button"> Delete </button>
     //           </div>
     //         </div>
     //       </div>
     //
     //       <div className="Total-Box">
     //         <div className="Total-Cart-Info-Left">
     //           <p style={{ fontSize: '30px', color: '#662A82' }}><b> Summary </b> </p>
     //           <br />
     //           <p style={{ fontSize: '25px' }}> <b> Total </b></p>
     //           <br />
     //         </div>
     //         <div className="Total-Cart-Info-Right">
     //           <br />
     //           <br />
     //           <br />
     //           <br />
     //           <br />
     //           <br />
     //           <p style={{ fontSize: '25px' }}> <b> $200 </b></p>
     //         </div>
     //       </div>
     //     </div>
     //   </div>
     // );
     // }

     return (
       <div>
         <MainNavBar history={history} />
         <div className="Cart-Window">
           <div className="Cart-Left-Side">
             <ProfileNavBar />
           </div>
           <div className="Cart-Right-Side">
             <p className="Title"> My Shopping Cart </p>
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
