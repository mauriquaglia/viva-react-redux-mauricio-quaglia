import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Accordion, useAccordionButton, Modal, Button } from 'react-bootstrap';
import { userActions, questionActions, itemActions } from '../_actions/index';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: {
                name: '',
                description: '',
                createdUserId: ''
            },
            selectId: '',
            submitted: false,
            item: {
                questionId: '',
                questionItem: '',
                type: 'question',
                createdUserId: ''
            },
            itemResponse: {
                response: '',
                isTrue: ''
            },
            itemResponses:[],
            selectItemId: '',
            submittedItem: false,
            showModal: false,
            toPlayQuestionId: '',
            toPlayQuestionName: '',
            responsesIsTrue: {}
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.handleChangeItemResponse = this.handleChangeItemResponse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitItem = this.handleSubmitItem.bind(this);
        this.handleSelectQuestion = this.handleSelectQuestion.bind(this);

     }

    
    handleChange(event) {
        const { name, value } = event.target;
        let { question } = this.state;
        question.createdUserId = this.props.user.id;
        this.setState({
            question: {
                ...question,
                [name]: value
            }
        });
    }

    handleChangeItem(event) {
        const { name, value } = event.target;
        let { item } = this.state;
        item.createdUserId = this.props.user.id;
        item.questionId = this.props.user.id;
        this.setState({
            item: {
                ...item,
                [name]: value
            }
        });

    }

    handleChangeItemResponse(event) {
        const { name, value } = event.target;
        let {  itemResponse } = this.state;
        this.setState({
            itemResponse: {
                ...itemResponse,
                [name]: value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { question } = this.state;
        if (question.name && question.description ) {
        this.state.selectId ?  await this.props.updateQuestion(this.state.selectId, question) : await this.props.register(question)
            this.setState({question: {
                name:  '',
                description: '',
                createdUserId: question.createdUserId
            },
            selectId: '',
            submitted: false,
            });
        }
    }   

    async handleSubmitItem(event) {
        event.preventDefault();
        this.setState({ submittedItem: true });
        const { item, itemResponses } = this.state;
        if (item.questionItem  && itemResponses.length > 1 ) {
        this.state.selectItemId ?  await this.props.updateItem(this.state.selectItemId, {item: item, responses: itemResponses }) : await this.props.registerItem({item: item, itemResponses: itemResponses})
        this.setState({itemResponse: {
            response: '',
            isTrue: ''
        },
        item: {
            questionId: '',
            questionItem: '',
            type: 'question',
            createdUserId: ''
        },
        itemResponses:[],
        submittedItem: false
        });

        }
    } 

    Logout() {
        return (e) => userActions.logout();
    }

    componentDidMount() {
        this.props.getQuestions();
        this.props.getItems();
        

    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteQuestion(id) {
        return (e) => this.props.deleteQuestion(id);
    }
 
    handleDeleteQuestionItem(id) {
        return (e) => this.props.deleteQuestionItem(id);
    }

    handleSelectQuestion(question) {
        return (e) => {

                this.setState({question: {
                    name:  question.name,
                    description: question.description
                },
                selectId: question.id
                });

        }
 
    }

    handleSelectQuestionItem(item) {
        return (e) => {

            this.setState({item: {
                questionId: item.questionId,
                questionItem: item.questionItem,
                type: item.type,
                createdUserId: item.createdUserId
            },
            itemResponses:item.responses,
            selectItemId: item._id
            });

        }
 
    }

    handleAddQuestionItemResponse(response, questionId) {
        return (e) => {
            let itemResponses = this.state.itemResponses;
            let item = this.state.item;
            item.questionId = questionId
            itemResponses.push({response: response, isTrue: itemResponses.length == 0 ? true : false });
            this.setState({itemResponses: itemResponses, item: item });
        }

    }

    handleDeleteQuestionItemResponse(index) {
        return (e) => {
            let itemResponses = this.state.itemResponses;
            itemResponses.length-1 == index ? itemResponses.pop() : '';
            this.setState({itemResponses: itemResponses});
        }

    }

    handleClose = () => this.setState({showModal: false})
    handleShow = () =>  this.setState({showModal: true})

    toPlay(cuestionId, cuestionName) {
        return (e) => {
            this.setState({showModal: true, toPlayQuestionId: cuestionId, toPlayQuestionName: cuestionName})
            
        }
    }

    toFinish() {
        return (e) => {
            this.setState({showModal: false, toPlayQuestionId: '', toPlayQuestionName: '', responsesIsTrue: {} })
            
        }
    }
    
    validateResponse(questionId, questionItemId, responseId) {

    }

    clickResponse(cuestionItemId, isTrue, valida = true) {
        return (e) => {
            if (valida) this.setState( {responsesIsTrue: {...this.state.responsesIsTrue, [cuestionItemId]: isTrue ? 1 : -1} })
        }
        /*
        let responsesIsTrue = this.state.responsesIsTrue;
        responsesIsTrue.push( {questionId: questionId, questionItemId: questionItemId, responseId: responseId} )
        return (e) => {
            this.setState( {responsesIsTrue: responsesIsTrue})
        }
        */
    }


    
    

    render() {
        function CustomToggle({ children, eventKey }) {
            const decoratedOnClick = useAccordionButton(eventKey, () =>
              console.log('totally custom!'),
            );
          
            return (
              <a onClick={decoratedOnClick}
              >
                {children}
              </a>
            );
          }
        const { user, users, registering, questions, items } = this.props;
        const { question, submitted, item, itemResponse, itemResponses, submittedItem, showModal, toPlayQuestionId, 
            toPlayQuestionName, responsesIsTrue } = this.state;



        return (
            <div className="col">

                <h1>Bienvenido {user.firstName}!</h1>
                <p>Este es el Viva Quiz</p>
                <Accordion >
                <Accordion.Item eventKey="-1">
                <Accordion.Header><h2 className="fw-bold">+&nbsp;&nbsp;</h2><span>Ingrese o modifique un cuestionario</span></Accordion.Header>
                <Accordion.Body>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !question.name ? ' has-error' : '')}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" name="name" value={question.name} onChange={this.handleChange} />

                        {submitted && !question.name &&
                            <div className="help-block text-danger">El nombre es requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !question.description ? ' has-error' : '')}>
                        <label htmlFor="description">Descripción</label>
                        <input type="text" className="form-control" name="description" value={question.description} onChange={this.handleChange} />
                        <input type="hidden" className="form-control" name="createdUserId" value={user.id}  />
                        {submitted && !question.description &&
                            <div className="help-block text-danger">La descripción es requerida</div>
                        }
                    </div>
                    <br/>
                    <div className="form-group">
                        <button name="agregar" className="btn btn-primary">{this.state.selectId ? 'Actualizar' : 'Agregar' } Cuestionario</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                </Accordion.Body>
                </Accordion.Item>
                {questions.items ? questions.items.map((question, index) =>
                <Accordion.Item key={question.id} eventKey={index}>
                <Accordion.Header ><span className="fw-bold">{question.name + ' (' + question.description + ')'}</span>
                {questions.loading && <em>Cargando ...</em>}
                {questions.error && <span className="text-danger">ERROR: {questions.error}</span>}
                </Accordion.Header>
                <Accordion.Body>
                {
                    question.deleting ? <em> - Borrando...</em>
                    : question.deleteError ? <span className="fw-bold text-danger"> - ERROR: {question.deleteError}</span>
                    : <span className="fw-bold"> <a onClick={this.handleDeleteQuestion(question.id)}>Borrar</a></span>
                 }
                <span className="fw-bold"> - <a onClick={this.handleSelectQuestion(question)}><CustomToggle eventKey="-1">Actualizar</CustomToggle></a></span>
                <span className="fw-bold"><a onClick={this.toPlay(question.id, question.name + ' (' + question.description + ')' ) }> - Jugar</a></span>

                    <Accordion >
                        <Accordion.Item eventKey="-1">
                        <Accordion.Header><h2 className="fw-bold">+&nbsp;&nbsp;</h2><span>Agregue o modifique preguntas</span></Accordion.Header>
                        <Accordion.Body>
                            <form name="form" onSubmit={this.handleSubmitItem}>
                                        <div className={'form-group' + (submittedItem && !item.questionItem ? ' has-error' : '')}>
                                            <label htmlFor="name">Pregunta</label>
                                            <input type="text" className="form-control" name="questionItem" value={item.questionItem} onChange={this.handleChangeItem} />
                                            {submittedItem && !item.questionItem &&
                                                <div className="help-block text-danger">La pregunta es requerida</div>
                                            }
                                        </div>
                                        {item.type == 'question' &&
                                        <div className={'form-group' + (submittedItem && !item.itemResponses ? ' has-error' : '')}>
                                            <label htmlFor="response">Respuesta</label>
                                            <input type="text" className="form-control" name="response" value={itemResponse.response} onChange={this.handleChangeItemResponse} />
                                            {submittedItem && (itemResponses.length < 2 || itemResponses.length > 10)  &&
                                                <div className="help-block text-danger">{itemResponses.length > 10 ? 'No debe haber más de 10 respuestas' : 'Debe haber al dos una respuesta'}</div>
                                            }
                                        </div>
                                        }
                                        <ul className="list-group">
                                        <a  onClick={itemResponse.response && this.handleAddQuestionItemResponse(itemResponse.response, question.id)}><li className="list-group-item active">Agregue respuestas (la primera es la correcta)</li></a>
                                        {itemResponses.map((Response, index) =>
                                        <a key={index} onClick={this.handleDeleteQuestionItemResponse(index)}><li
                                        className={'list-group-item list-group-item-' + (Response.isTrue ? 'success' : 'danger')}>{Response.response }</li></a>
                                        )}
                                        </ul>

                                        <br/>
                                        <div className="form-group">
                                            <button name="agregar" className="btn btn-primary">{this.state.selectItemId ? 'Actualizar' : 'Agregar' } Preguntas</button>
                                            {registering && 
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                            </form>
                        </Accordion.Body>
                        </Accordion.Item>

                        {items.items ? items.items.filter(item =>item.questionId.includes(question.id))
                        .map((item, index) =>
                        <Accordion.Item key={item._id} eventKey={index}>
                        <Accordion.Header><span className="fw-bold">{item.questionItem}</span>
                        {items.loading && <em>Cargando ...</em>}
                        </Accordion.Header>
                        <Accordion.Body>
                        {
                            items.deleting ? <em> - Borrando...</em>
                            : items.deleteError ? <span className="fw-bold text-danger"> - ERROR: {question.deleteError}</span>
                            : <span className="fw-bold"> <a onClick={this.handleDeleteQuestionItem(item._id)}>Borrar</a></span>
                        }
                        <span className="fw-bold" > - <a onClick={this.handleSelectQuestionItem(item)}><CustomToggle eventKey="-1">Actualizar</CustomToggle></a></span>
                            <ul className="list-group">
                                    {item.responses.sort((a, b) => (a._id > b._id) ? 1 : -1).map((Response, index) =>
                                    <li key={index}
                                    className={'list-group-item list-group-item-' + (Response.isTrue ? 'success' : 'danger')}>{Response.response}</li>
                                    )}
                            </ul>
                        </Accordion.Body>
                        </Accordion.Item>
                        ) : '' }              

                        </Accordion>  

                </Accordion.Body>
                </Accordion.Item>
                ) : '' }
                </Accordion>

            <Modal size="lg" show={showModal} onHide={this.toFinish()}>
                <Modal.Header closeButton>
                <Modal.Title>{toPlayQuestionName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {items.items ? items.items.filter(item =>item.questionId.includes(toPlayQuestionId))
                .map((item, _index) =>
                <ul  key={item._id} className="list-group" > 
                    <a onClick={itemResponse.response && this.handleAddQuestionItemResponse(itemResponse.response, question.id)}><li className="list-group-item active">{item.questionItem + (responsesIsTrue[item._id] ? responsesIsTrue[item._id] == 1  ? ' (Correcto)' : ' (Incorrecto)' : '')}</li></a>
                    {item.responses.sort((a, b) => (a.response > b.response) ? 1 : -1)
                    .map((Response, index) =>
                    <a  onClick={responsesIsTrue[item._id]  ? this.clickResponse(item._id, Response.isTrue, false) : this.clickResponse(item._id, Response.isTrue)}>
                    <li key={index} 
                    className={'list-group-item list-group-item-' + (Response.isTrue && responsesIsTrue[item._id] ? 'success' : responsesIsTrue[item._id] ? 'danger' : ''  )}>{Response.response }</li>
                    </a>
                    )}
                </ul>
                ) : ''}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.toFinish()}>Terminar</Button>
                </Modal.Footer>
            </Modal>

            </div>
        );
    }
}

function mapState(state) {
    const { users, questions, items, authentication } = state;
    const { registering } = state.registration;
    const { user } = authentication;
    return { user, users, questions, items, registering };
}

const actionCreators = {
    register: questionActions.register,
    registerItem: itemActions.register,
    getUsers: userActions.getAll,
    getQuestions: questionActions.getAll,
    getItems: itemActions.getAll,
    deleteUser: userActions.delete,
    deleteQuestion: questionActions.delete,
    deleteQuestionItem: itemActions.delete,
    updateQuestion: questionActions.update,
    updateItem: itemActions.update
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };