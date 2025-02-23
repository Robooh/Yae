class GifPlayer {
    constructor(gifElement, audioSrc) {
        this.gifs = [
            './Gifs/kita.gif',
            './Gifs/miku.gif',
            './Gifs/rub.gif',
            './Gifs/Henya.gif',
            './Gifs/Mah.gif',
            './Gifs/Kal.gif'
            // './Gifs/Clov.gif'
        ];
        this.currentGif = 0;
        this.gifElement = gifElement;
        this.audio = new Audio(audioSrc);
        this.isPlaying = false;
        this.cycleCount = 0; 

        this.init();
    }


    init() {
        document.getElementById('start-button').addEventListener('click', () => this.togglePlay());
        document.getElementById('prev-button').addEventListener('click', () => this.prevGif());
        document.getElementById('next-button').addEventListener('click', () => this.nextGif());
        document.getElementById('reset-button').addEventListener('click',() => this.resetPlay());
    }

    togglePlay() {
        if (!this.isPlaying) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        this.gifElement.src = this.gifs[this.currentGif];
        this.gifElement.style.display = 'block';
        this.audio.loop = true;
        this.audio.play();
        this.isPlaying = true;
        document.getElementById('start-button').textContent = 'Pause';

        const isMobile = window.matchMedia("(max-width: 600px)").matches;
        
        this.interval = setInterval(() => {
            this.currentGif = (this.currentGif + 1) % this.gifs.length;
            this.gifElement.src = this.gifs[this.currentGif];
            
            
            if (!isMobile && this.currentGif === 0) {
                this.cycleCount++;
                if (this.cycleCount === 1) {
                    clearInterval(this.interval);
                    this.cycleCount = 0;
                }
            }
        }, 1500);
    }



    pause() {
        this.audio.pause();
        this.gifElement.style.display = 'none';
        this.isPlaying = false;
        document.getElementById('start-button').textContent = 'Start';
        clearInterval(this.interval); 
        this.cycleCount = 0; 
    }


    prevGif() {
        this.currentGif = (this.currentGif - 1 + this.gifs.length) % this.gifs.length;
        this.gifElement.src = this.gifs[this.currentGif];
    }

    nextGif() {
        this.currentGif = (this.currentGif + 1) % this.gifs.length;
        this.gifElement.src = this.gifs[this.currentGif];
    }

    resetPlay() {
        location.reload();
    }
}


const gifElement = document.getElementById('gif');
const gifPlayer = new GifPlayer(gifElement, './Song/Doodle.mp3');
