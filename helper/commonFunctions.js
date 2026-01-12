module.exports = {

    formateChatTime: (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000); // seconds

        if (diff < 60) return `${diff}s`;    // seconds

        const minutes = Math.floor(diff / 60);
        if (minutes < 60) return `${minutes}m`; // minutes

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`;   // hours

        const days = Math.floor(hours / 24);
        if (days < 365) return `${days}d`;    // days

        const years = Math.floor(days / 365);
        return `${years}y`;                    
    }

}