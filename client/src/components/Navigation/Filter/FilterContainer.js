import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilterAC } from '../../../redux/notesReducer';
import Filter from './Filter';

const FilterContainer = ({ setFilterAC, activeFilter }) => {

    const handleChangeFilter = (e) => {
        if(activeFilter !== e.target.name) {
            setFilterAC(e.target.name);
        }
    }

    return(
        <Filter 
            handleChangeFilter={handleChangeFilter}
            activeFilter={activeFilter} />
    );
};

const mapStateToProps = (state) => {
    return {
        activeFilter: state.todoPage.activeFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterAC
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);