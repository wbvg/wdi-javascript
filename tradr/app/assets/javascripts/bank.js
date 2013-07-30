// $(document).ready(function () {

//         var balance = user.balance

//         /*==== Savings Account ====*/
//         /* Addition */

//         $('#balance').text(balance);
//         var compute_savings_deposit = function () {
//             var savings_deposit = parseInt($('#savings_amount').val());
//             balance = balance + savings_deposit;
//             $('#balance').text(balance);
//             $('#balance').removeClass('alert');
//             $('#balance').addClass('success');
//         }

//         $('#calc_deposit').click(compute_savings_deposit);
//         $('#balance').addClass('success');


//         /* Subtraction */

//         $('#balance').text(balance)
//         var compute_savings_withdrawl = function () {
//             var savings_withdrawl = parseInt($('#savings_amount').val());

//             if (balance > savings_withdrawl) {
//                 $('#balance').removeClass('alert');
//                 $('#balance').addClass('success');
//                 balance = balance - savings_withdrawl;
//             } else {
//                 $('#balance').addClass('alert');
//                 alert('Insufficient funds');
//             }
//             // } else if (balance < 0) {
//             //     balance = 0;
//             //     $('#balance').addClass('alert');
//             //     $('#balance').text(chq_balance);
//             //     alert('Insufficient funds in Savings Account').addClass('alert');

//             $('#balance').text(balance);
//         }


//         $('#calc_withdrawl').click(compute_savings_withdrawl);
//         $('#balance').addClass('success');

//         /* ==== Cheque Account ==== */
//         /* Addition */

//         var chq_balance = 1000;

//         $('#chq_balance').text(chq_balance);
//         var compute_cheque_deposit = function () {
//             var cheque_deposit = parseInt($('#cheque_amount').val());
//             chq_balance = chq_balance + cheque_deposit;
//             $('#chq_balance').text(chq_balance);
//             $('#chq_balance').removeClass('alert');
//             $('#chq_balance').addClass('success');
//         }

//         $('#chq_calc_deposit').click(compute_cheque_deposit);
//         $('#chq_balance').addClass('success');

//         /* Subtraction */

//         $('#chq_balance').text(chq_balance);



//         var compute_cheque_withdrawl = function () {
//             var cheque_withdrawl = parseInt($('#cheque_amount').val());
//             var overdraft = (chq_balance - cheque_withdrawl)
//    // debugger;
//             if (chq_balance >= cheque_withdrawl) {
//                 $('#chq_balance').removeClass('alert');
//                 $('#chq_balance').addClass('success');
//                 chq_balance = chq_balance - cheque_withdrawl;

//                 // Writing the cheque code
//             } else if (overdraft < 0) { // Moving money from Cheque Account.
//                 balance = balance - (cheque_withdrawl - chq_balance);
//                 chq_balance = 0;
//                 if (balance < 0) {
//                 $('#balance').addClass('alert');

//                 balance = 0;
//                 alert('Insufficient funds');

//                 return;
//                 }

//                 $('#balance').addClass('alert');
//                 $('#chq_balance').addClass('borrow');
//                 alert('Borrowing from Savings Account!');
//         };

//     $('#chq_balance').text(chq_balance);
//     $('#balance').text(balance);
// }

// $('#chq_calc_withdrawl').click(compute_cheque_withdrawl);
// $('#chq_balance').addClass('success');
// $('#balance').addClass('success');

// });