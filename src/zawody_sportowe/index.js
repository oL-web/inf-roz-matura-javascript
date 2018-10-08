/* 
Zadanie 5. Zawody sportowe (0–12)

Mateusz cały rok przygotowuje się do zawodów sportowych w skoku w dal. Codziennie
trenuje, a wynik – długość najdłuższego skoku podaną w centymetrach – zapisuje w pliku
tekstowym dziennik.txt. W pliku tym znajduje się 310 liczb odpowiadających
długościom najlepszych skoków Mateusza w kolejnych dniach treningowych. Każda liczba
jest zapisana w osobnym wierszu.

Przykład:
436
571
569
435

Pozytywną serią treningową Mateusz nazywa każdy ciąg kolejnych dni treningowych,
w czasie których uzyskuje on każdego następnego dnia treningu lepszy rezultat niż dnia
poprzedniego i którego to ciągu nie można przedłużyć (jest to ostatni zanotowany wynik albo
wynik z następnego dnia jest gorszy).

Przykład:
478 475 470 480 481 481 475 477 480 482 470
W tym przypadku najdłuższa pozytywna seria treningowa (podkreślona) trwała 4 dni,
a Mateusz w jej trakcie poprawił swój wynik o 482–475=7 centymetrów.
W wybranym przez siebie języku programowania napisz program, za pomocą którego
uzyskasz odpowiedzi na poniższe pytania.

Zadanie 5.1.
Ile Mateusz miał pozytywnych serii treningowych dłuższych niż 3 dni?

Zadanie 5.2.
Ile wynoszą długości najdłuższego oraz najkrótszego skoku Mateusza? Podaj, które to były
wyniki, licząc od początku prowadzenia dziennika.

Zadanie 5.3.
Podaj, z ilu dni składała się jego najdłuższa pozytywna seria treningowa oraz o ile
centymetrów poprawił w jej trakcie swój wynik.
*/

export const streaksHigherThan = (arr, min) => {
    const arrLength = arr.length;
    const minStreak = Math.max(min - 1, 1);
    let winStreak = 0;
    let streaksHigherThan = 0;

    for (let i = 1; i < arrLength; i++) {
        const num = arr[i];
        const prevNum = arr[i - 1];

        if (num > prevNum) {
            winStreak++;
            if ((winStreak >= minStreak) && (i + 1 === arrLength)) streaksHigherThan++;
        } else {
            if (winStreak >= minStreak) streaksHigherThan++;
            winStreak = 0;
        }
    }

    return streaksHigherThan;
};

export const minMaxArr = (arr = []) => {
    if (!arr.length) return { min: -1, max: -1 };
    let min = 0;
    let max = 0;

    arr.forEach((num, i) => {
        if (num > arr[max]) max = i;
        if (num < arr[min]) min = i;
    });

    return { min, max };
};

export const highestStreak = (arr = []) => {
    const arrLength = arr.length;
    let highestValue = arrLength ? 1 : 0;
    let winStreak = highestValue;
    let difference = 0;

    for (let i = 1; i < arrLength; i++) {
        const num = arr[i];
        const prevNum = arr[i - 1];

        if (num > prevNum) {
            winStreak++;

            if (winStreak > highestValue) {
                difference = num - arr[i - highestValue];
                highestValue = winStreak;
            }
        } else winStreak = 0;
    }

    return { highestValue, difference };
};

