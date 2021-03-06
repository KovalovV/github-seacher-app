import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        userResult: [],
        user: {},
        userRepos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text,
        });

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items,
        });
    };

    const getSingleUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if(response.status == '404'){
            window.location = '/notfound';
        }

        const data = await response.json();

        dispatch({
            type: 'GET_SINGLE_USER',
            payload: data,
        });
    };

    const getUserRepos = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if(response.status == '404'){
            window.location = '/notfound';
        }

        const data = await response.json();

        dispatch({
            type: 'GET_USER_REPOS',
            payload: data,
        });
    };

    const setLoading = () => dispatch({type: 'SET_LOADING'});

    const handleClear = () => {
        dispatch({
            type: 'CLEAR_USERS',
            payload: [],
        });
    };

    return (
        <GithubContext.Provider 
            value={{
                userResult: state.userResult,
                loading: state.loading,
                user: state.user,
                userRepos: state.userRepos,              
                searchUsers,
                handleClear,
                getSingleUser,
                getUserRepos,
            }}>
                {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;