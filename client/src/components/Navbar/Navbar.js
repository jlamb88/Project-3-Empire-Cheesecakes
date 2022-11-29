import { Button, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../../CartContext';
import CartProduct from '../CartProduct/CartProduct';

function NavComponent() {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // adds up all product.quantity to show total amount of products in cart
    const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    console.log(cart);
    return (
        <div>
            <Navbar expand='sm'>
                <Navbar.Brand href='/'>
                    E-Commerce Store
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Button onClick={handleShow}> Cart ({ productCount }) </Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* If there are products, map over current */}
                    { productCount > 0 ?
                        <div>
                            <p>In Cart: </p>
                            { cart.items.map((currentProduct, index) => (
                                // gives product info to the cart modal to display
                                <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}>Total</CartProduct>
                            ))}
                            {/* total cost limited to 2 decimals */}
                            <h2>Total: { cart.getTotalCost().toFixed(2) }</h2>

                            <Button variant='success'>Checkout</Button>
                        </div>
                    :
                        <div>
                            <p>Your Cart Is Empty!</p>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NavComponent;