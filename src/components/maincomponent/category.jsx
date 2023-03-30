import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/category.css';
import List from '../component/list'
import Paper from '@mui/material/Paper';

function importAll(r) {
    let images = r.keys()
    images = images.map(item=> item.replace('./',''));
    return images;
}
function showlist(e){
 console.log(e)
 let a = document.getElementsByClassName(e);
  if(a[0].style.display == 'none')
    a[0].style.display = 'block';
  else 
  a[0].style.display = 'none';
}

function Category() {
    const img = importAll(require.context('../../img/cat/',false, /\.(webp)$/));
  return (
    <>
    <div id="category">
        {img.map(item=>
            <Link to={`/Product?category=${item.replace(' ','_').replace('.webp','')}`}>
            <div className="cat-item">
            <img src={require(`../../img/cat/${item}`)} alt={item} />
            <h4 
            onClick={()=>showlist(item.replace(' ','_').replace('.webp',''),'block')}
            >{item.replace('.webp','')}
            </h4>
            <div className={item.replace(' ','_').replace('.webp','') + ' list-main'} style={{display:'none'}}>
              {/*<Paper>
                <List />
              </Paper>*/}
            </div>
            </div>
            </Link>
            )}
    </div>
    </>
  )
}

export default Category