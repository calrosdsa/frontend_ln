import { getHistory } from "../../actions/profile";
import {connect} from 'react-redux'
import {useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'

const History=({profile:{history,loading},getHistory,match})=>{
    useEffect(()=>{
    getHistory()
    },[getHistory])

    return(
        <Fragment>

            
            {history === null || loading ? (
            <div className="pt-40 bg-gray-700 h-screen w-screen"> 
            </div>
            )
            :
            (<div className="pt-40 bg-gray-500 h-screen w-screen">
                {history.map((item)=>(
                <div className="">
                    <h1>{item.title}</h1>
                    <img src={item.cover} className="h-40 w-32" alt="" />
                </div>
                ))}                
            </div>)
        }       
        </Fragment>
    )
}
History.propTypes = {
    getHistory : PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateProps =(state)=> ({
    profile: state.profile
})
export default connect(mapStateProps,{getHistory})(History);