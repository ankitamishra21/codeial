{
    //method to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');//frtching the form from home.ejs

        newPostForm.submit(function(e){
            e.preventDefault();//prevent thr default form submission cause we want to do it by ajax cause previously it loaded the page again and again on post creation

            $.ajax({
                type: 'post',
                url: '/posts/create',//action from the form of home.ejs
                data: newPostForm.serialize(),//serialize will convert the post data in json format
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    //enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                
                
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
//after submitting need to receive in post controller 
    }
    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                        </small>
                        
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <br>
                        <small>
                            
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 Likes
                            </a>
                            
                        </small>
                    </p>  
                    <div class="post-comments">
                        
                    <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comment">
                            </form>
                        
                    </div>  
                
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                            
                        </ul>
                    </div>   
                </li>    `)
    }
    //method to delete a post from DOM
    let deletePost =  function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }








    createPost();
}