$(function(){
	$(document).ready(function(){
		$.ajax({
			url: '/post_title',
			success: function(data){
				post_title(data);
				click_title();
			},
			error: function( err ){
				console.log(err);
			}
		});

	});

// post_title, and append data
	var post_title = function post_title( data ){
		// console.log( data[0].title );
		var title_frag = document.createDocumentFragment();

		for(var i=0; i < data.length; i++){
			// console.log(data[i].title);
			var li = document.createElement('li');
			// var temp_title = data[i].title;
			li.innerHTML = data[i].title;
			// if( temp_title.length > 30 ){
				// temp_title = temp_title.substring(0, 30) + "...";
			// }

			// put artical id in invisianle div
			var div = document.createElement('div');
			div.className = "con_id";
			div.innerHTML = data[i].id;
			// console.log("from server"+data[i].id);

			// append element
			li.appendChild(div);
			title_frag.appendChild( li );
		}
		$('#title_div').append(title_frag);
	}

//while on click, triger
	var post_con = function post_con( con_id ){
		$.ajax({
			url: '/'+con_id,
			success: function(data){
				var h1 = document.createElement('h1');
				h1.innerHTML = data[0].title;
				var con_frag = document.createDocumentFragment();

				for(var i=0; i< data[0].content.length; i++){
					// console.log( data[0].content[i] );
					var p = document.createElement('p');
					p.innerHTML = data[0].content[i];
					con_frag.appendChild(p);
				}
				var $content_div = $('#content_div');
				$content_div.empty();

				$content_div.append(h1);
				$content_div.append(con_frag);
				// $('#content_div').append(h1);
				// $('#content_div').append(con_frag);
			},
			error: function( err ){
				console.log(err);
			}
		});
	}

	var click_title = function click_title(){
		$('li').click(function(e){
			var con_id = $(this).find('div').text();
			// console.log( con_id );
			post_con( con_id );
		})
	};

	// var layout = function layout(){
	// 	$('li').hover(function(){
	// 		$(this).addClass('.li_hover');
	// 	})
	// }
})