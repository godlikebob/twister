const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Bem-vindo à roleta de cores e membros! Diga "Gire a roleta" para começar.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Diga "Gire a roleta" para iniciar.')
            .getResponse();
    },
};

const SpinWheelIntentHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'SpinWheelIntent'
        );
    },
    handle(handlerInput) {
        const members = ['Mão Esquerda', 'Mão Direita', 'Pé Esquerdo', 'Pé Direito'];
        const colors = ['Vermelho', 'Azul', 'Verde', 'Amarelo'];

        // Sorteia o membro e a cor
        const randomMember = members[Math.floor(Math.random() * members.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const speechText = `A roleta sorteou: ${randomMember} no ${randomColor}. Boa sorte!`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Diga "Gire a roleta" para jogar novamente.')
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput) {
        const speechText = 'Você pode dizer "Gire a roleta" para iniciar o jogo!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        const speechText = 'Até a próxima!';
        return handlerInput.responseBuilder.speak(speechText).getResponse();
    },
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
        );
    },
    handle(handlerInput) {
        const speechText = 'Desculpe, eu não entendi isso. Você pode dizer "Gire a roleta" para começar.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Diga "Gire a roleta" para começar.')
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Erro detectado: ${error.message}`);
        const speechText = 'Desculpe, ocorreu um erro. Por favor, tente novamente.';
        return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SpinWheelIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
