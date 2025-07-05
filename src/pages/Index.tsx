import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Cake, Stars, Flame } from 'lucide-react';

const Index = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [currentCount, setCurrentCount] = useState(3);
  const [candlesLit, setCandlesLit] = useState(0);
  const [showCandles, setShowCandles] = useState(true);
  
  const countdownRef = useRef<HTMLDivElement>(null);
  const surpriseRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const birthdayTextRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const balloonsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const cakeSlicesRef = useRef<HTMLDivElement>(null);
  const candlesRef = useRef<HTMLDivElement>(null);

  // Countdown animation
  useEffect(() => {
    if (showCountdown && countdownRef.current) {
      const countdown = () => {
        if (currentCount > 0) {
          gsap.fromTo(countdownRef.current, 
            { scale: 0, opacity: 0, rotation: -180 },
            { 
              scale: 1.5, 
              opacity: 1, 
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              onComplete: () => {
                gsap.to(countdownRef.current, {
                  scale: 0,
                  opacity: 0,
                  duration: 0.3,
                  delay: 0.5,
                  onComplete: () => {
                    if (currentCount === 1) {
                      // Show "Surprise!"
                      if (surpriseRef.current) {
                        gsap.fromTo(surpriseRef.current,
                          { scale: 0, opacity: 0 },
                          { 
                            scale: 2, 
                            opacity: 1, 
                            duration: 1,
                            ease: "elastic.out(1, 0.3)",
                            onComplete: () => {
                              gsap.to(surpriseRef.current, {
                                opacity: 0,
                                scale: 0,
                                duration: 0.5,
                                delay: 1,
                                onComplete: () => {
                                  setShowCountdown(false);
                                }
                              });
                            }
                          }
                        );
                      }
                    } else {
                      setCurrentCount(prev => prev - 1);
                    }
                  }
                });
              }
            }
          );
        }
      };
      countdown();
    }
  }, [currentCount, showCountdown]);

  // Main content animation
  useEffect(() => {
    if (!showCountdown && mainContentRef.current) {
      gsap.fromTo(mainContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
      
      // Animate birthday text letter by letter
      setTimeout(() => animateBirthdayText(), 500);
      
      // Animate quote after birthday text
      setTimeout(() => animateQuote(), 2000);
      
      // Start background animations
      setTimeout(() => {
        animateFloatingBalloons();
        animateConfetti();
        animateSparkles();
      }, 1000);
    }
  }, [showCountdown]);

  const animateBirthdayText = () => {
    if (birthdayTextRef.current) {
      const text = "Happy Birthday Saravanan!";
      const letters = text.split('').map((char, index) => 
        `<span key=${index} class="letter inline-block" style="color: hsl(${index * 20}, 70%, 60%)">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      birthdayTextRef.current.innerHTML = letters;
      
      // Initial animation
      gsap.fromTo('.letter', 
        { 
          opacity: 0, 
          scale: 0, 
          y: -50,
          rotation: -360 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1
        }
      );

      // Continuous bouncing animation
      setTimeout(() => {
        gsap.to('.letter', {
          y: -20,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.1
        });

        // Rainbow color cycling
        gsap.to('.letter', {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: "none",
          stagger: 0.1
        });
      }, 2000);
    }
  };

  const animateQuote = () => {
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.4)"
        }
      );

      // Gentle floating animation
      gsap.to(quoteRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };

  const animateFloatingBalloons = () => {
    if (balloonsRef.current) {
      const balloons = balloonsRef.current.children;
      Array.from(balloons).forEach((balloon, index) => {
        gsap.fromTo(balloon,
          { y: window.innerHeight + 100, x: Math.random() * window.innerWidth },
          {
            y: -100,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            delay: index * 2,
            ease: "none"
          }
        );
        
        gsap.to(balloon, {
          x: `+=${Math.random() * 100 - 50}`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }
  };

  const animateConfetti = () => {
    if (confettiRef.current) {
      const confettiPieces = confettiRef.current.children;
      Array.from(confettiPieces).forEach((piece, index) => {
        gsap.fromTo(piece,
          { 
            y: -20, 
            x: Math.random() * window.innerWidth,
            rotation: 0,
            opacity: 1
          },
          {
            y: window.innerHeight + 20,
            rotation: 360 + Math.random() * 360,
            duration: 4 + Math.random() * 2,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "none"
          }
        );
      });
    }
  };

  const animateSparkles = () => {
    if (sparklesRef.current) {
      const sparkles = sparklesRef.current.children;
      Array.from(sparkles).forEach((sparkle, index) => {
        gsap.fromTo(sparkle,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2,
            ease: "power2.inOut"
          }
        );
      });
    }
  };

  const handleCandleClick = (candleIndex: number) => {
    if (candlesLit < 5) { // Maximum 5 candles
      const newCandlesLit = candlesLit + 1;
      setCandlesLit(newCandlesLit);
      
      // Animate candle lighting
      const candle = candlesRef.current?.children[candleIndex];
      if (candle) {
        const flame = candle.querySelector('.candle-flame');
        if (flame) {
          gsap.fromTo(flame,
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5,
              ease: "back.out(1.7)"
            }
          );
          
          // Add flickering animation
          gsap.to(flame, {
            scale: 1.1,
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }
      
      // If all candles are lit, show special message
      if (newCandlesLit === 5) {
        setTimeout(() => {
          setShowCandles(false);
          // Blow out animation
          gsap.to(candlesRef.current?.children, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.in"
          });
        }, 2000);
      }
    }
  };

  // Simple cake animation
  useEffect(() => {
    if (!showCountdown && cakeRef.current) {
      // Simple bounce animation for the cake
      gsap.to(cakeRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Gentle rotation
      gsap.to(cakeRef.current, {
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [showCountdown]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative">
      {/* Background Elements */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
          />
        ))}
      </div>

      <div ref={balloonsRef} className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-6 h-8 rounded-full ${
              ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400'][i % 5]
            }`}
          />
        ))}
      </div>

      <div ref={sparklesRef} className="fixed inset-0 pointer-events-none z-15">
        {Array.from({ length: 30 }, (_, i) => (
          <Stars
            key={i}
            className="absolute text-yellow-300"
            size={16}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Countdown */}
      {showCountdown && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-gradient-to-r from-purple-400 to-pink-400">
          <div ref={countdownRef} className="text-white text-9xl font-bold">
            {currentCount}
          </div>
          <div ref={surpriseRef} className="text-white text-6xl font-bold absolute opacity-0">
            Surprise! 🎉
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showCountdown && (
        <div ref={mainContentRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative z-20">
          {/* Birthday Text */}
          <div ref={birthdayTextRef} className="text-4xl md:text-7xl font-bold mb-8 text-center leading-tight">
          </div>

          {/* Inspirational Quote */}
          <div ref={quoteRef} className="text-center max-w-3xl mx-auto mb-12 opacity-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/30">
              <p className="text-2xl md:text-3xl font-semibold text-purple-700 mb-4 italic">
                "✨ No matter what life throws at you, remember-your sister is always here, standing strong by your side.! ✨"
              </p>
              <p className="text-lg md:text-xl text-purple-600 leading-relaxed">
              Have a wonderful day filled with joy and happiness!<br/>
              Your passion,innovation and leadership continue to inspire a generation <br/>
              May this year bring  even greater heights and groundbreaking sucess! 🌟
              </p>
            </div>
          </div>

          {/* Simple Cake Section with Candles */}
          <div className="relative mb-12">
            {/* Candles */}
            {showCandles && (
              <div ref={candlesRef} className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    onClick={() => handleCandleClick(i)}
                    className="cursor-pointer relative"
                  >
                    {/* Candle stick */}
                    <div className="w-2 h-12 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-full border border-yellow-500"></div>
                    {/* Candle flame */}
                    <div className={`candle-flame absolute -top-3 left-1/2 transform -translate-x-1/2 ${candlesLit > i ? 'opacity-100' : 'opacity-0 scale-0'}`}>
                      <Flame size={16} className="text-orange-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              ref={cakeRef}
              className="cursor-pointer transform hover:scale-105 transition-transform relative"
            >
              <Cake size={120} className="text-yellow-600 mx-auto mb-4" />
              <p className="text-center text-purple-600 font-semibold text-lg">
                {showCandles && candlesLit < 5 && "Light the candles! 🕯️"}
                {showCandles && candlesLit === 5 && "Make a wish and blow them out! 💫"}
                {!showCandles && "Enjoy your delicious cake! 🎂✨"}
              </p>

              {/* Candle lighting progress */}
              {showCandles && (
                <div className="mt-2 flex justify-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < candlesLit ? 'bg-orange-400' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Simple Cake Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }, (_, i) => (
                <Stars
                  key={i}
                  className="absolute text-yellow-400 animate-pulse"
                  size={20}
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 200}%`,
                    top: `${50 + (Math.random() - 0.5) * 200}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Birthday Message */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">
              Wishing you a day filled with happiness! 🎈
            </h2>
            <p className="text-lg text-purple-500 mb-8">
              May your birthday be the start of a year filled with good luck, good health, and much happiness.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-4xl">
              🎉 🎂 🎈 🎁 🌟 ✨🎊 🥳
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-purple-400 text-sm">
              Made with ❤️ for your special day
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
