export function formatTimeAgo(date) {
    const now = new Date();
    const timeDiff = now - new Date(date);
  
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    // if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    // if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    // return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    //these returned full values, so i'm using alternate words below

    if(days> 0) return `${days}d ago`;
    if(hours> 0) return `${hours}h ago`;
    if(minutes> 0) return `${minutes}m ago`;
    return `${seconds}s ago`
  }

  //I preferred this over moment.js
  