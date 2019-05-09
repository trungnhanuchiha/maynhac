import React, {Component} from "react";
import "../assets/css/UploadPage.css";
import { Image, Form, Button, Segment, Header, Icon, Step, Label, Container, Grid, Progress, Dropdown } from "semantic-ui-react";
import Dropzone from 'react-dropzone'
import $ from 'jquery';
class UploadBox extends Component{
    render(){
        if (this.props.currentStep !== 1) {
            return null;
        }
           const song = this.props.song.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));


        return (<div className="upload-box-wrapper">
            <Dropzone multiple={false} onDrop={this.props.handleSongChange}>
            {({getRootProps, getInputProps}) => (
                <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                <input
                type="file"
                accept="audio/*"
                name="file"
                className="inputfile"
                id="embedpollfileinput"
                {...getInputProps()}
                />
                <Segment placeholder>
                <Header icon>
                <Icon name="upload" />
                <div>
                {this.props.song.length ? <ul>{song}</ul> :
                'No documents are listed for this customer.'}
                </div>
                </Header>
                <label
                htmlFor="embedpollfileinput"
                className="ui huge red right floated button"
                >
                Upload!
                </label>
                </Segment>
                </div>
                </section>
            )}
            </Dropzone></div>
        )
    }
}

class SongDetails extends Component{
    render(){
        const { values } = this.props;
        if (this.props.currentStep !== 2) {
            return null;
        }
        const options = [
            {  text: "V-pop", value: 1 },
            {  text: "K-pop", value: 2 },
            {  text: "J-pop", value: 3 },
            {  text: "Western", value: 4 },
        ]

        return(<div className="song-details-wrapper">
            <Form color='green' >
                <Form.Field>

<Dropzone multiple={false} onDrop={this.props.handlePhotoChange}>
  {({getRootProps, getInputProps}) => (<div className="image-frame"><Image fluid src={this.props.photo.length ? URL.createObjectURL(this.props.photo[0]) : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='medium' {...getRootProps()} style={{width:'100%'}}/>
                <input name="photo" type="file" {...getInputProps()}/></div>
  )}
</Dropzone>
                </Form.Field>
                <Form.Field>
                    <label>Title</label>
                    <input
                    name='title'
                    value={this.props.title}
                    placeholder='Title'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input
                    name='author'
                    value={this.props.author}
                    placeholder='Author'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Artist</label>
                    <input
                    name='artist'
                    value={this.props.artist}
                    placeholder='Artist'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
              <Form.Field control={Dropdown} options={options} label='Category' placeholder='Category' name="type" onChange={this.props.handleChange} value={this.props.type} />
                <Form.Field>
                    <label>Lyrics</label>
                    <input
                    name='lyrics'
                    value={this.props.lyrics}
                    placeholder='Lyrics'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
            </Form></div>
        )
    }
}

class UploadDone extends Component{
    render(){
        if (this.props.currentStep !== 3) {
            return null;
        }

        let data = new FormData();
        data.append("name", this.props.title);
        data.append("lyrics", this.props.lyrics);
        data.append("author", this.props.author);
        data.append("artist", this.props.artist);
        data.append("song", this.props.song[0]);
        data.append("avatar", this.props.photo[0]);
        data.append("typeid", this.props.type);
        console.log("FormData: ", data);
        console.log("Props: ", this.props);
        $.post({
            url: 'http://localhost:5000/api/song/postSong',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: this.props.handleUploadSuccess,
            error: function(j, st, err) {
                console.log(st, err);
            }
        });

        return (<div className="upload-done-wrapper">
  <Grid>
    <Grid.Row>
      <Grid.Column>
            { (this.props.success) ? <Icon circular color='green' name='checkmark' size='massive'/> : ""}
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column>
        <Progress size="medium" indicating autoSuccess percent={this.props.success ? 100 : 20}/>
        </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
                <Label horizontal size='massive'>
                    {this.props.success ?
                    "Success!" : "Uploading"
                    }
                </Label>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
            <Grid.Column>
                <Header as="h1"></Header>
            </Grid.Column>
    </Grid.Row>
  </Grid>
            </div>
        )
    }
}
class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.onDrop = (song) => {
            this.setState({song})
        };
        this.state = {
            currentStep: 1,
            title: '',
            author: '',
            artist: '',
            lyrics: '',
            song: [],
            photo: [],
            success: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSongChange = this.handleSongChange.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
    }
    _next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
    }
    _prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    }
    handleSongChange(acceptedFiles) {
        this.setState({song: acceptedFiles});
        this._next();
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    handlePhotoChange(photo) {
        this.setState({
            photo
        });
    }
    handleUploadSuccess(data, textStatus) {
        this.setState({success: true});
    }
    render() {

        // const song = this.state.song.map(file => (
        //     <li key={file.name}>
        //     {file.name} - {file.size} bytes
        //     </li>
        // ));
        return (
            <section className="upload-container">
            <div className="step-group">
            <Step.Group ordered>
            <Step>
            <Step.Content>
            <Step.Title>Upload</Step.Title>
            <Step.Description>Upload your songs.</Step.Description>
            </Step.Content>
            </Step>
            <Step>
            <Step.Content>
            <Step.Title>Information</Step.Title>
            <Step.Description>Enter song information</Step.Description>
            </Step.Content>
            </Step>
            <Step>
            <Step.Content>
            <Step.Title>Upload</Step.Title>
            </Step.Content>
            </Step>
            </Step.Group>
            </div>
            <UploadBox song={this.state.song} currentStep={this.state.currentStep} handleChange={this.handleChange} handleSongChange={this.handleSongChange}/>
            <SongDetails currentStep={this.state.currentStep} photo={this.state.photo} handleChange={this.handleChange} handlePhotoChange={this.handlePhotoChange} title={this.state.title} author={this.state.author} artist={this.state.artist} lyrics={this.state.lyrics} />
            <UploadDone {...this.state}/>
            <div className="nav-panel">
            <Button icon labelPosition='left' onClick={this._prev} disabled={this.state.currentStep === 3}>
            <Icon name='left arrow' />
      Go back
    </Button>
    <Button icon labelPosition='right' onClick={this._next} disabled={this.state.currentStep === 3 || !this.state.song}>
            {this.state.currentStep === 1 ? 'Continue' : 'Upload'}
      <Icon name='right arrow' />
    </Button>
            </div>
            </section>
            );
        }


        onFormSubmit = e => {
            e.preventDefault();
            console.log(this.state);
        };
    }

    export default UploadPage;
