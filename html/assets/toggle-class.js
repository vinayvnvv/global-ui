

(function() {

	function initToggleClass() {
	    console.log("init toggle class")
		var tClass = document.querySelectorAll('[toggle-class]');
		console.log(tClass)
		for(var i=0;i<tClass.length;i++) {
			console.log(tClass)
			obj = JSON.parse(tClass[0].attributes.getNamedItem('toggle-class').value);
			obj.status = false;
			tClass[0].setAttribute('toggle-class', JSON.stringify(obj));
			tClass[i].onclick = tClassPerform;
		}


		function tClassPerform(ref) {
			var src = ref.target;
			obj = JSON.parse(src.attributes.getNamedItem('toggle-class').value);
			var tClassFor = document.querySelectorAll('[toggle-class-id]');
			for(var i=0;i<tClassFor.length;i++) {
				var id = tClassFor[i].attributes.getNamedItem('toggle-class-id').value;
				if(id == obj.for) {
					if(obj.status) { //remove
	                   tClassFor[i].classList.remove(obj.class)
					} else { //add
	                   tClassFor[i].classList.add(obj.class)
					}
				}
			}

			obj.status = !obj.status;
			src.setAttribute('toggle-class', JSON.stringify(obj));
		}

	}	



	function initAddClass() {
	    console.log("init add class")
		var tClass = document.querySelectorAll('[add-class]');
		console.log(tClass)
		for(var i=0;i<tClass.length;i++) {
			tClass[i].onclick = aClassPerform;
		}


		function aClassPerform(ref) {
			var src = ref.target;
			obj = JSON.parse(src.attributes.getNamedItem('add-class').value);
			var tClassFor = document.querySelectorAll('[add-class-id]');
			for(var i=0;i<tClassFor.length;i++) {
				var id = tClassFor[i].attributes.getNamedItem('add-class-id').value;
				if(id == obj.for) {
	                   tClassFor[i].classList.add(obj.class)
					
				}
			}
		}

	}



	function initRemoveClass() {
	    console.log("init remove class")
		var tClass = document.querySelectorAll('[remove-class]');
		console.log(tClass)
		for(var i=0;i<tClass.length;i++) {
			tClass[i].onclick = rClassPerform;
		}


		function rClassPerform(ref) {
			var src = ref.target;
			obj = JSON.parse(src.attributes.getNamedItem('remove-class').value);
			var tClassFor = document.querySelectorAll('[remove-class-id]');
			for(var i=0;i<tClassFor.length;i++) {
				var id = tClassFor[i].attributes.getNamedItem('remove-class-id').value;
				if(id == obj.for) {
	                   tClassFor[i].classList.remove(obj.class)
					
				}
			}
		}

	}	





    function initClassAction() {
		//init after DOM load
		document.addEventListener('DOMContentLoaded', initToggleClass , false);
		document.addEventListener('DOMContentLoaded', initAddClass , false);
		document.addEventListener('DOMContentLoaded', initRemoveClass , false);
	}

	initClassAction();

	window["initClassAction"] = initClassAction;

}) ();

 