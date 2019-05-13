import Service from './Service'
import React from 'react'
import { Server } from 'https';

class PlaylistService extends React.Component {
    handleGetMyPlaylists(data, callback){
        const token = localStorage.getItem('x-access-token');
        Service.get('playlist/Playlist', {headers: {'x-access-token': token}})
        .then( res =>{
            callback(res);
        })
        .catch( err =>{
            console.log(err);
        });
    }

    handleCreatePlaylist(data, callback){
        const {name, description, typeid, token} = data;
        console.log(token);
        Service.post('playlist/createPlaylist', {name, description, typeid} ,{headers: {'x-access-token': token}})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    } 
    
    handRemovePlaylist(data, callback){
        const {playlistId, token} = data;
        Service.post('playlist/deletePlaylist',{playlistId} ,{headers: {'x-access-token': token}})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }

    handleUpdatePlaylist(data, callback){
        const {name, description, type, idplaylist, token} = data;
        Service.post('playlist/updatePlaylist', {name, description, type, idplaylist} ,{headers: {'x-access-token': token}})
        .then( res => {
            callback(res);
        })
        .catch( err => {
            console.log(err);
        });
    }
}

export default (new PlaylistService());