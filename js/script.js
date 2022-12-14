'use strict';

(() => 
{
	// const submitBtnElm = document.querySelector('form');
	const submitBtnIdElm = document.querySelector('#submitBtn');
	let btnValueElm = document.querySelector('input[value="Submit"]');
	// input box selecting
	const productNameElm = document.querySelector('#productName');
	const productPriceElm = document.querySelector('#productPrice');
	const searchInputElm = document.querySelector('#searchInput');
	let listGroupElm = document.querySelector('.list-group');
	// showing error message 
	let error1Elm = document.querySelector('#error1');
	let error2Elm = document.querySelector('#error2');
	// list group element 
	const listItemsElm = document.querySelector('.list-items');

	// Data storage
	let database = JSON.parse(localStorage.getItem('product-list')) || [];

	// sound Effect
	const twoEmptyErrorElm = new Audio("audio/two-empty-input.wav");
	const errorElm = new Audio("audio/error.wav");
	const submitSuccessElm = new Audio("audio/submit-success.wav");
	const deleteElm = new Audio("audio/delete.wav");
	const numberErrorElm = new Audio("audio/numberError.wav");

	

	showData(database);

	// submit button start here 
	submitBtnIdElm.addEventListener('click',(evt) => 
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
	    seperatedisErrorFun(isError,name,price);
		// changin submit button color and name 
		submitBtnIdElm.style.backgroundColor = '#311B92';
		submitBtnIdElm.value = 'Submit';

	});

	
	// list group click event start here 
	listItemsElm.addEventListener('click',(evt) => 
	{
		// getting id form product
		let uniqueId = getProductId(evt);

		if(evt.target.classList.contains('delete-item'))
		{
			
			// getting parent element and then remove the element
			let parrentElm = geetingParrent(evt)
			// remove item form database
			removeItemFromDataBase(uniqueId);
			// remove Item Form localStorage
			removeItemFormLocalStorage(uniqueId);
			// remove element 
			removeElm(parrentElm)

		}
	})

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
									<i class="fa-solid delete-item fa-trash-can"></i>
									<i class="fa-solid updated-item fa-pencil"></i>
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
		// showin item to ui 
		showItemToUI(id,name,price)
		
		// setting localStarage part 
		localStorage.setItem('product-list',JSON.stringify(database));
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
	// showing local storage item to ui 
	

	function showData()
	{
		
		database.forEach((data) => 
		{
			const htmlElm = `
								<div class="list-group-elements item=${data.id}">
									<p class="product">${data.name}-$ <span id="product-price"><strong>${data.price}</strong>
										<i class="fa-solid delete-item fa-trash-can"></i>
										<i class="fa-solid updated-item fa-pencil"></i>
									</span></p>
								</div>
							`;
			listGroupElm.insertAdjacentHTML('beforebegin',htmlElm);
		});
	}


	function hideDate()
	{
		listGroupElm.innerHTML = '';
		database.length = 0;
	}

	// Getting id form database
	// remove Item Form localStorage
	function removeItemFormLocalStorage(id)
	{ 
		let localStorageProduct = JSON.parse(localStorage.getItem('product-list'));
		let newProduct = localStorageProduct.filter((localStorageProducts) => localStorageProducts.id !== id);
		localStorage.setItem('product-list',JSON.stringify(newProduct))
	}
})();

