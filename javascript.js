function analyzeNews() {
    let text = document.getElementById("newsInput").value;
    if (text.trim() === "") {
        alert("Please enter news content");
        return;
    }

    let sentimentScore = getSentiment(text);
    let credibilityScore = checkSourceCredibility(text);
    let fakeKeywordsScore = checkFakeKeywords(text);

    let finalScore = sentimentScore + credibilityScore + fakeKeywordsScore;
    
    let resultText = "";
    if (finalScore < 0.5) resultText = "❌ This news is likely FAKE.";
    else resultText = "✅ This news is likely GENUINE.";

    document.getElementById("result").innerHTML = resultText;
}

function getSentiment(text) {
    let positiveWords = ["good", "excellent", "trustworthy", "credible"];
    let negativeWords = ["fake", "scam", "hoax", "fraud"];

    let words = text.toLowerCase().split(/\W+/);
    let score = 0;

    words.forEach(word => {
        if (positiveWords.includes(word)) score += 0.1;
        if (negativeWords.includes(word)) score -= 0.1;
    });

    return Math.max(0, Math.min(1, score));
}

function checkSourceCredibility(text) {
    let trustedSources = ["bbc.com", "cnn.com", "nytimes.com"];
    let fakeSources = ["fakenews.com", "rumors.net", "hoaxworld.org"];

    let score = 0.5;
    trustedSources.forEach(source => {
        if (text.includes(source)) score = 1;
    });
    fakeSources.forEach(source => {
        if (text.includes(source)) score = 0;
    });

    return score;
}

function checkFakeKeywords(text) {
    let fakeWords = ["breaking", "shocking", "you won't believe", "unbelievable", "must see"];
    let score = 0.5;

    fakeWords.forEach(word => {
        if (text.toLowerCase().includes(word)) score -= 0.1;
    });

    return Math.max(0, score);
}
