// import React, { useState } from 'react'; // Import useState for state management
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Grid, TextField, Button } from "@mui/material";
// import Swal from 'sweetalert2';
// import { createReview } from '../../../redux/Reducer/review';
// import IReview from "../../../interface/review";
// interface ReviewFormProps {
//   // Add any additional props your component might need here
// }

// const ReviewForm: React.FC<ReviewFormProps> = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const jwt = localStorage.getItem("jwt");
//   const navigate = useNavigate();

//   const [review, setReview] = useState(''); // State to store the review text

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);
//     const reviewData:IReview = {
//       productId: product._id,
//       title: data.get("review") as string, 
//       name: data.get("name") as string
//     };

 

//     // }

//     console.log(reviewData);
//     dispatch(createReview(reviewData));

//     // if (jwt) {
//     //  
//     //   const Toast = Swal.mixin({
//     //     toast: true,
//     //     position: "top-end",
//     //     showConfirmButton: false,
//     //     timer: 3000,
//     //     timerProgressBar: true,
//     //     didOpen: (toast) => {
//     //       toast.onmouseenter = Swal.stopTimer;
//     //       toast.onmouseleave = Swal.resumeTimer;
//     //     },
//     //   });
//     //   Toast.fire({
//     //     icon: "success",
//     //     title: "Đánh giá thành công load lại để xem",
//     //   });
//     // } else {
//     //   Swal.fire({
//     //     title: "Đăng nhập để đánh giá",
//     //     showClass: {
//     //       popup: `
//     //         animate__animated
//     //         animate__fadeInUp
//     //         animate__faster
//     //       `,
//     //     },
//     //     hideClass: {
//     //       popup: `
//     //         animate__animated
//     //         animate__fadeOutDown
//     //         animate__faster
//     //       `,
//     //     },
//     //   });
//     //   navigate('/login');
//     // }
//   };

//   return (
//     <div style={{ padding: '30px' }}>
//       <p>Đánh giá sản phẩm</p>
//       <form onSubmit={handleSubmit} className='mb-10'>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={8}>
//             <TextField
//               required
//               id='review'
//               name='review'
//               label='Đánh giá'
//               value={review} // Set the value from state
//               onChange={(e) => setReview(e.target.value)} // Update state on change
//               row={4}
//               fullWidth
//             />
//           </Grid>
//           <Grid item sx={12} sm={3}>
//             <Button
//               className='bg-[#9155FD] w-full'
//               type='submit'
//               variant='contained'
//               size='large'
//               sx={{ padding: '.8rem 0', bgcolor: '#9155FD' }}
//             >
//               Đánh giá
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;
