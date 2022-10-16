'use strict';

(() => 
{
	const submitBtnElm = document.querySelector('form');
	// input box selecting
	const productNameElm = document.querySelector('#productName');
	const productPriceElm = document.querySelector('#productPrice');
	let listGroupElm = document.querySelector('.list-group');
	// showing error message 
	let error1Elm = document.querySelector('#error1');
	let error2Elm = document.querySelector('#error2');
	// list group element 
	const listItemsElm = document.querySelector('.list-items');

	// Data storage
	let database = [];

	// sound Effect
	const twoEmptyErrorElm = new Audio("audio/two-empty-input.wav");
	const errorElm = new Audio("audio/error.wav");
	const submitSuccessElm = new Audio("audio/submit-success.wav");
	const deleteElm = new Audio("audio/delete.wav");
	const numberErrorElm = new Audio("audio/numberError.wav");



	// submit button start here 
	submitBtnElm.addEventListener('submit',(evt) => 
	{
		evt.preventDefault();
		// resiving value form input box
		const [name,price] = resivingValueFormInput();
		/*
			----------------------------------
			my step-2 Validation input
			----------------------------------
		*/
		// if isError is not true then our other's function will work
		const isError = validationInputBox(name,price);
		// i just seperated isError conditon for clean coding
	   seperatedisErrorFun(isError,name,price)
	});

	// list group click event start here 
	listItemsElm.addEventListener('click',(evt) => 
	{
		if(evt.target.classList.contains('delete-item'))
		{
			// getting id form product
			let uniqueId = getProductId(evt);
			// getting parent element and then remove the element
			let parrentElm = geetingParrent(evt)
			// remove item form database
			removeItemFromDataBase(uniqueId)
			// remove element 
			removeElm(parrentElm)
		}
	})

	/*
	------------- Delete function start here -------------------------
	*/
	// remove element 
	function  removeElm(removes)
	{
		removes.remove();
		deleteElm.play();
	}
	// getting parent element and then remove the element
	function geetingParrent(evt)
	{
		return (evt.target.parentElement.parentElement.parentElement);
	}

	// remove item form database
	function removeItemFromDataBase(id)
	{
		let removeId = database.filter((product) => product.id !== id)
		database = removeId;

	}
	// getting id form product
	function getProductId(evt)
	{
		let id = Number(evt.target.parentElement.parentElement.parentElement.classList[1].split('=')[1]);
		return id;
	}
	/*
		------------- Delete function end here -------------------------
	*/
	/*
			------------- submit button funciton start here  -------------------------
	*/
	// --------Validation input box start here ------------
	function seperatedisErrorFun(isError,name,price)
	{
		if(!isError)
		{
			// when this condition will work then our error message will be remove
			error1Elm.textContent = '';
			error2Elm.textContent = '';
			submitSuccessElm.play();

			// passing data to database
			let getUniqueID = PassDateToDataBase(name,price);
			// showing item to UI
			showItemToUI(getUniqueID,name,price);
			// reset input box
			resetInputBox();
		}
	}
	// validation 
	function validationInputBox(name,price)
	{
		let invalidInput = false;
		if(!name)
		{
			// Please sir fill up the input field
			error1Elm.textContent = 'Please fill up the name input field!!';
			error1Elm.style.color = 'red';
			errorElm.play()
		}
		if(name)
		{
			// Please sir fill up the input field
			error1Elm.textContent = '';
		}
		if(!name && !price)
		{
			twoEmptyErrorElm.play();
		}
		if(!price)
		{
			error2Elm.textContent = 'Please fill up the price input field!!';
			error2Elm.style.color = 'red';
			errorElm.play()
		}
		if(!name || !price)
		{
			return invalidInput = true
		}
		if(Number(price) !== Number(price))
		{
			error2Elm.textContent = 'Please Enter Number!!';
			error2Elm.style.color = 'red';
			numberErrorElm.play()
			return invalidInput = true;
		}
		return invalidInput;
	}

	// ----------------------Resiving input value form input start here ---------------------------
	// reset input box
	function resetInputBox() 
	{
		productNameElm.value = '';
		productPriceElm.value = '';
	}
	// showing item to UI
	function showItemToUI(id,name,price)
	{
		const htmlElm = `
							<div class="list-group-elements item=${id}">
								<p class="product">${name}-$ <span id="product-price"><strong>${price}</strong>
									<i class="fa-solid updated-item fa-pencil"></i>
									<i class="fa-solid delete-item fa-trash-can"></i>
								</span></p>
							</div>
						`;
		listGroupElm.insertAdjacentHTML('beforebegin',htmlElm);
	}
	// passing data to database
	function PassDateToDataBase(name,price)
	{
		// creating unique id
		let id = database.length;
		// passing
		database.push(
		{
			id,
			name,
			price
		});
		// console.log(database);
		// return the unique it 
		return id;
	}
	// resiving value form input box
	function resivingValueFormInput() 
	{
		let ProductName = productNameElm.value;
		let ProductPrice = productPriceElm.value;
		return [ProductName,ProductPrice];
	}
	/*
			------------- submit button funciton End here  -------------------------
	*/
})();

