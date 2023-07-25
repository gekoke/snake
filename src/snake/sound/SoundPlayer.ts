
export class SoundPlayer {

    private isPlayingMusic: boolean = false;

    startMusic = (): void => {
        if (!this.isPlayingMusic) {
            let backgroundMusic = new Audio("../../assets/sounds/music.wav");
            backgroundMusic.loop = true;
            backgroundMusic.play();
            this.isPlayingMusic = true;
        }
    }

    playSingleChomp() : void {
        new Audio("../../assets/sounds/chomp.wav").play();
    }

    playLosingSound() : void {
        new Audio("../../assets/sounds/losingSound.wav").play();
    }
}