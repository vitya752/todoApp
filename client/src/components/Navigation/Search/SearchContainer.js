import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearchAC } from 'redux/notesReducer';
import Search from './Search';


const SearchContainer = ({ search, setSearchAC }) => {

    const handleChangeSearch = (e) => {
        setSearchAC(e.target.value);
    }
    
    return(
        <Search
            search={search}
            handleChangeSearch={handleChangeSearch} />
    );
};

const mapStateToProps = (state) => {
    return {
        search: state.todoPage.search
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setSearchAC
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);