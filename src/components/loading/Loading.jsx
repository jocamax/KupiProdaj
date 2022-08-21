import React from 'react'
import './loading.css'
import '../post/post.css'

const Loading = () => {
  return (
    <div className='post-grid'>
      <div className='oglasContainerLi'>
      
        <div className='oglasContainer'>
          <div className='oglasImgContainer'>
          <div className='oglasImgLoading'></div>
          </div>

         <div className='oglasMainContent'>
           <div className='mainContentFlex1'>
             <div className='nameAndPhone'>
            <p className='oglasName aTagRemove loadingText'>namenamename</p>
             <p className='brTelefona loadingText'>ostalo</p>
             </div>
       
            <p className='oglasLocation'></p>
           </div>
            <div className="mainContentFlex2">
              <p className='loadingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nihil?</p>
              <p></p>
            </div>
            <div>
              <button className='btn btnLoading loadingText'> arrrrrr</button>
            </div>
         </div>
        </div>
      </div>
      <div className='oglasContainerLi'>
      
      <div className='oglasContainer'>
        <div className='oglasImgContainer'>
        <div className='oglasImgLoading'></div>
        </div>

       <div className='oglasMainContent'>
         <div className='mainContentFlex1'>
           <div className='nameAndPhone'>
          <p className='oglasName aTagRemove loadingText'>namenamename</p>
           <p className='brTelefona loadingText'>ostalo</p>
           </div>
     
          <p className='oglasLocation'></p>
         </div>
          <div className="mainContentFlex2">
            <p className='loadingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nihil?</p>
            <p></p>
          </div>
          <div>
            <button className='btn btnLoading loadingText'> arrrrrr</button>
          </div>
       </div>
      </div>
    </div>
    <div className='oglasContainerLi'>
      
      <div className='oglasContainer'>
        <div className='oglasImgContainer'>
        <div className='oglasImgLoading'></div>
        </div>

       <div className='oglasMainContent'>
         <div className='mainContentFlex1'>
           <div className='nameAndPhone'>
          <p className='oglasName aTagRemove loadingText'>namenamename</p>
           <p className='brTelefona loadingText'>ostalo</p>
           </div>
     
          <p className='oglasLocation'></p>
         </div>
          <div className="mainContentFlex2">
            <p className='loadingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nihil?</p>
            <p></p>
          </div>
          <div>
            <button className='btn btnLoading loadingText'> arrrrrr</button>
          </div>
       </div>
      </div>
    </div>
      
    </div>
  )
}

export default Loading