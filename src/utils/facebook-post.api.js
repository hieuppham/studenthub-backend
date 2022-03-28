const axios = require('axios');
const { URL } = require('url');

const MY_URL = new URL('https://graph.facebook.com');
MY_URL.search = `?access_token=${process.env.FACEBOOK_LONG_LIVED_TOKEN}`;

module.exports = { addPost, deletePost };

async function addPost(question, tags) {
    try {
        MY_URL.pathname = `/v13.0/${process.env.PAGE_ID}/feed`;

        const message = generateMessage(question, tags);
        const response = await axios.post(MY_URL.toString(), { message });
        return response.data;
    } catch (error) {
        return error;
    }
}


async function deletePost(postId) {
    try {
        MY_URL.pathname = `/v13.0/${postId}`;
        const response = await axios.delete(MY_URL.toString());
        return response.data;
    } catch (error) {
        return error;
    }
}

function generateMessage(question, tags) {
    const reputations = question.User.reputation;
    let message = "";
    message += `FROM: ${question.User.displayName} [${reputations} ${reputations == 0 ? 'reputation' : 'reputaions'}]`;
    message += `\n\n`;
    message += `Q: ${question.title}\n`;
    message += `${question.content}`
    message += `\n\n`;
    tags.forEach(tag => {
        message += `#${tag} `;
    });
    message += `\n`
    message += `LINK: https://www.facebook.com/studenthub2022`;
    return message;
}