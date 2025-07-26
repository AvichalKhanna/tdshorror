import { useLocation } from 'react-router-dom';
import PlayerList from './PlayerList';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const prompts = {
  Family: {
    truths: [
      "What’s a happy memory you've never told anyone?",
      "Have you ever lied to your parents about something important?",
      "What’s your most embarrassing childhood habit?",
      "Do you have a secret talent your family doesn’t know about?",
      "What’s a family tradition you secretly hate?",
      "Who’s your least favorite relative and why?",
      "Have you ever overheard a family secret?",
      "What’s the worst trouble you got in as a kid?",
      "Have you ever hidden a bad grade from your parents?",
      "What’s the weirdest thing your family does that you thought was normal?",
      "Have you ever blamed a sibling for something you did?",
      "What’s something you wish you could tell your family but haven’t?",
      "Have you ever eavesdropped on an adult conversation at home?",
      "What’s the most awkward family moment you’ve witnessed?",
      "Which family member do you trust the least?",
      "Have you ever ruined a family photo on purpose?",
      "What’s a lie you told to avoid a family event?",
      "Have you ever faked being sick to skip a family gathering?",
      "Which family member has the worst taste in fashion?",
      "Who would you NOT want to be stuck with on a deserted island?",
      "What’s the most embarrassing nickname your family has given you?",
      "Have you ever snooped through someone’s room in your house?",
      "Who in your family do you secretly admire?",
      "What’s the most boring family vacation you’ve been on?",
      "What’s something your parents still don’t know you did?",
      "What’s the worst gift you’ve ever received from a relative?",
      "Have you ever broken something valuable and blamed someone else?",
      "What’s the weirdest rule your family has?",
      "What’s the most dramatic moment in a family dinner you remember?",
      "Have you ever laughed during a serious family event like a funeral?"
    ],
    dares: [
      "Give a genuine compliment to every player.",
      "Call a family member and say you love them.",
      "Talk like a baby for the next 2 rounds.",
      "Let someone draw on your face with a marker (washable!).",
      "Speak in a made-up family language for 2 minutes.",
      "Tell a fake family secret convincingly.",
      "Act like your mom/dad for 1 minute.",
      "Switch clothes with someone for 1 round.",
      "Let the group choose a new family nickname for you.",
      "Balance a spoon on your nose while telling a family story.",
      "Perform a family dinner as a dramatic soap opera.",
      "Imitate your sibling’s most annoying habit.",
      "Act out getting grounded by a parent.",
      "Sing a lullaby to someone in the group.",
      "Read a childhood diary entry (or fake one).",
      "Let someone recreate a hairstyle your parents made you wear.",
      "Give your best fake parent lecture for 1 minute.",
      "Tell a joke only your grandma would find funny.",
      "Wear socks on your hands for the next 2 turns.",
      "Make up a bedtime story involving everyone.",
      "Play 'mom says' like 'Simon says' for 1 minute.",
      "Take a group family photo pose.",
      "Say something wise as a 90-year-old grandparent.",
      "Let someone spoon-feed you like a baby.",
      "Tell a funny but embarrassing bathroom story.",
      "Mime giving 'the talk' to a kid.",
      "Give someone a family-themed rap performance.",
      "Use only family clichés when speaking for 3 minutes.",
      "Make up a dramatic family scandal.",
      "Pretend you’re grounded and plead for freedom."
    ],
    situations: [
      "You're at your cousin's wedding and forget the speech. Panic act!",
      "You're a 5-year-old trying to convince your mom to let you skip school.",
      "You just broke your grandma’s favorite vase. React realistically.",
      "You're caught sneaking back home at 3AM. Explain yourself.",
      "You're introducing your weirdest boyfriend/girlfriend to your parents.",
      "You just found out you were adopted. Confront your parents.",
      "Your sibling stole your favorite toy. Start a tantrum.",
      "You're trying to explain TikTok to your grandpa.",
      "You're hosting a chaotic Thanksgiving dinner.",
      "You walked in on your parents dancing awkwardly. React!",
      "You're trapped in a family road trip with no AC and bad music.",
      "You're trying to hide a party from your parents who came home early.",
      "You're pretending to love a terrible gift.",
      "You're babysitting and something spooky happens.",
      "You find a family member's embarrassing secret.",
      "You're stuck in a family reunion with people you don’t know.",
      "You're telling your family you dropped out of college.",
      "You just got caught kissing someone by a family member.",
      "You're meeting your partner’s family and everything goes wrong.",
      "You forgot your parents' anniversary. Pretend you didn’t.",
      "You're lying about your report card grades.",
      "You just realized you’re at the wrong family reunion.",
      "You’re playing Monopoly and it turns into a war.",
      "You and your sibling are covering for a broken TV.",
      "You’re giving a fake tour of your family home to celebrities.",
      "You're a pet trying to fit in with your human family.",
      "You're explaining social media to a confused uncle.",
      "You're giving a eulogy for a goldfish. Get emotional.",
      "You just found an old family curse hidden in the attic.",
      "You're stuck in an elevator with your entire family."
    ]
  },
  Fun: {
    truths: [
      "What's the most embarrassing thing you've searched online?",
      "If you had to swap lives with one person in this room, who would it be and why?",
      "What's a silly talent you have that no one knows about?",
      "Who was your first ever crush?",
      "What’s the weirdest lie you’ve told to get out of something?",
      "What’s your guilty pleasure song or movie?",
      "Have you ever had a dream about someone here?",
      "What’s the most ridiculous reason you’ve ever cried?",
      "If you had to marry a fictional character, who would it be?",
      "Have you ever stalked someone on social media?",
      "What’s your weirdest habit?",
      "If animals could talk, which one would be the rudest?",
      "What was your most awkward date experience?",
      "What’s something totally random you’re afraid of?",
      "If you could instantly master any skill, what would it be?",
      "What’s your weirdest nickname ever?",
      "Who is your celebrity crush, and why?",
      "What’s the dumbest reason you’ve ever gotten in trouble?",
      "What’s one secret you’ve never told anyone here?",
      "Have you ever sent a text to the wrong person? What did it say?",
      "What’s something you wish you could delete from your memory?",
      "What’s your weirdest recurring dream?",
      "Have you ever peed in a pool? Be honest.",
      "If you had to be haunted by a ghost, who would you choose?",
      "If you turned into the opposite gender for a day, what’s the first thing you’d do?",
      "Have you ever tried to impress someone and failed miserably?",
      "What’s something super childish you still do?",
      "What’s the dumbest thing you’ve done on a dare?",
      "If your life were a movie, what genre would it be and why?",
      "If you were invisible for a day, what would you do first?"
    ],
    dares: [
      "Do your best celebrity impression for 30 seconds.",
      "Text your crush something random right now.",
      "Take a ridiculous selfie and send it to someone random in your contacts.",
      "Talk in an accent until your next turn.",
      "Try to lick your elbow and film yourself failing.",
      "Say the alphabet backwards while dancing.",
      "Let someone else send a text from your phone.",
      "Attempt to do a TikTok dance without practicing.",
      "Make up a song on the spot about someone in the room.",
      "Eat a spoonful of hot sauce or something spicy.",
      "Call a random contact and sing them happy birthday.",
      "Say two true things and one lie about yourself. Let others guess.",
      "Do your best evil laugh and hold eye contact with someone.",
      "Act like a cat until your next turn.",
      "Read the last thing you searched online out loud.",
      "Dance like no one’s watching for 30 seconds.",
      "Let someone else style your hair in the weirdest way.",
      "Wear socks on your hands for the next 3 rounds.",
      "Do 10 jumping jacks while singing your favorite song.",
      "Pretend to cry like a baby for 20 seconds.",
      "Let someone write something embarrassing on your forehead with a marker.",
      "Try to make someone laugh while they try to stay serious.",
      "Reveal your lock screen background.",
      "Try to balance a spoon on your nose for 15 seconds.",
      "Send a voice note of you singing to your best friend.",
      "Do your best robot dance.",
      "Imitate a famous cartoon character.",
      "Talk like a pirate until your next turn.",
      "Make up a dramatic story using only items near you.",
      "Draw a mustache on your face with a pen and wear it till your next turn."
    ],
    situations: [
      "Your friend’s crush just confessed to liking you. What do you do?",
      "You’re home alone and hear footsteps upstairs. No one else should be home. What do you do?",
      "You find a phone on the street. It has one recent photo: of YOU taken from behind. What do you do next?",
      "You wake up in someone else’s body. What’s the first thing you do?",
      "You find a hidden room in your house. It’s full of pictures of you sleeping. What do you do?",
      "A stranger hands you a note that reads, “Don’t look behind you.” Do you turn around?",
      "Your best friend is acting strange and refuses to blink. What’s your move?",
      "You're locked in a haunted house for one night. You hear whispers calling your name. Do you follow them?",
      "Your phone starts typing by itself. It sends your secrets to a random contact. What now?",
      "You receive a text that says: “I see you.” And then your lights go out. What do you do?",
      "You’re playing this game and suddenly a truth or dare question appears... that you never typed. Do you answer it?",
      "Someone who looks exactly like you walks into the room. What do you say?",
      "You find a diary that predicts your future—and it says you die tonight. What do you do?",
      "You’re given the power to be invisible—but only when no one is looking. How do you use it?",
      "You find an old photo album. Everyone in it is looking at you. Even the baby pictures. Explain.",
      "You're on a live video call when the screen glitches and shows a dark figure behind you. No one else sees it. What now?",
      "You wake up with a tattoo you don’t remember getting. It's in a language you don't recognize. What do you do?",
      "Every mirror in your house now shows a slightly delayed version of your reflection. How do you react?",
      "You receive a voice note from yourself—but from the future. What does it say?",
      "Your reflection smiles at you—but you didn’t smile. What happens next?",
      "The spirit board suddenly moves by itself. It spells your name. What's your reaction?",
      "Your friend suddenly starts speaking in a deep voice—not their own. What's your move?",
      "You hear your name whispered from inside your closet. You’re alone. Do you check?",
      "You start receiving texts from a number saved as 'YOU'. What do they say?",
      "You hear crying in the hallway at 3am, but everyone’s asleep. What do you do?",
      "You’re stuck in a time loop of this night. Each loop gets weirder. What changes first?",
      "Your doorbell rings. A package is there. Inside is a photo of you from today. But you never took it. Now what?",
      "You record a video and play it back. There's a whisper you didn’t hear while filming. What's the whisper?",
      "You fall asleep during this game and wake up in it. Everyone’s gone—but the game says it’s your turn. Do you play?",
      "A spirit offers you one wish—but there’s a cost. What’s the wish, and what’s the price?"
    ]
  },
 Crazy: {
    truths: [
      "Have you ever heard breathing in your room when no one was there?",
      "What’s the darkest paranormal thought you’ve ever entertained?",
      "Would you let a spirit possess you for 10 minutes to save a friend?",
      "Have you ever been turned on by fear?",
      "What’s a nightmare that still haunts you?",
      "Would you sleep naked in a graveyard if dared?",
      "Have you ever felt something brush against your skin in the dark?",
      "What’s a spirit you would willingly invite?",
      "What’s the creepiest thing you’ve done while alone?",
      "Would you kiss a ghost if they looked like your crush?",
      "Have you ever used fear to get closer to someone romantically?",
      "Do you think your house is haunted?",
      "Would you try astral projection if you might not return?",
      "Have you ever moaned out of fear and pleasure mixed?",
      "If you were to die right now, who would you haunt?",
      "What’s the one supernatural thing you secretly believe in?",
      "Would you let a spirit watch you while you undress?",
      "Have you ever felt a ghost touch you intimately?",
      "What’s a moment where you truly believed in the afterlife?",
      "Would you do a summoning ritual if it meant unlocking forbidden pleasure?",
      "Have you ever fantasized about someone who’s dead?",
      "What’s your darkest desire you’d never admit under light?",
      "Have you ever said 'I love you' to someone while terrified?",
      "Would you sacrifice a friend in a demon ritual if it saved your soul?",
      "Have you ever felt aroused during a horror movie?",
      "Would you kiss a demon if it promised to haunt you forever?",
      "What’s the most haunted experience you had but never told anyone?",
      "Do you believe mirrors can trap souls?",
      "Have you ever touched yourself after being scared?",
      "Would you spend a week alone in a haunted hotel for $1 million?"
    ],
    dares: [
      "Walk alone with a candle and say 'I'm yours' into a mirror 3 times.",
      "Lick the neck of the person to your left slowly — like a ghost craving skin.",
      "Act like you're possessed for 60 seconds — seduce someone while doing it.",
      "Stand facing a dark corner for one full minute and whisper your crush’s name.",
      "Pretend a ghost is touching your body. React erotically.",
      "Describe your most haunting sexual fantasy to the group.",
      "Let someone draw a cursed sigil on your lower back.",
      "Whisper a dark secret into someone’s ear like you’re a ghost.",
      "Crawl toward someone like a demon, then moan their name.",
      "Let someone blindfold you and breathe on your neck.",
      "Send a scary text to your ex saying 'I'm watching'.",
      "Go into the bathroom alone, turn off the light, and scream 'TAKE ME' three times.",
      "Lick the floor like a possessed victim.",
      "Let someone 'summon' you by saying your name — and appear seductively.",
      "Let someone else write a curse on your chest with their finger.",
      "Play dead for two minutes. If anyone laughs, they take a shot.",
      "Do a sensual dance for a ghost you imagine watching.",
      "Let someone tie your hands and whisper ghost stories in your ear.",
      "Take off one piece of clothing every time you hear the word 'spirit'.",
      "Hold someone's hand and stare into their eyes, saying, 'You're mine forever'.",
      "Talk to the mirror like it’s your dead lover, emotionally or sexually.",
      "Fake cry and beg a ghost not to take your soul.",
      "Let someone ‘possess’ you and control you for 2 minutes.",
      "Moan like a haunted soul while making eye contact with someone.",
      "Ask a yes/no question and use a pendulum or bottle to answer it.",
      "Trace a circle around someone and declare them cursed.",
      "Let someone whisper a dirty thought into your ear — and don't react.",
      "Walk around the room like you're being chased by a ghost — scared but aroused.",
      "Let someone 'exorcise' you with a seductive voice.",
      "Act out your own horror death — make it wild, hot, or scary."
    ],
    situations: [
      "You just woke up in a coffin underground. You hear whispering. What do you do?",
      "You're being chased by a faceless ghost. It stops when you undress. Do you keep running?",
      "You're alone in the dark, and someone starts kissing your neck. But no one's there.",
      "You're possessed. You must seduce one player before midnight or die.",
      "A spirit offers you any pleasure in exchange for one secret. What do you give?",
      "You hear your crush's voice whispering your name from the shadows.",
      "A mirror shows your dead twin, who wants to take your place.",
      "You wake up tied to a bed in an abandoned asylum. Someone touches your leg.",
      "The ghost of your ex returns — and wants one last night.",
      "You find a cursed phone. Every message makes you more aroused. Do you answer?",
      "The lights go out. Something touches your thigh. Do you scream or smile?",
      "You’re in a haunted motel room. You hear moaning from the bathroom.",
      "A demon offers to fulfill your deepest fantasy, but you must obey one command.",
      "Your friend is possessed and begs you to kiss them to break the curse.",
      "You find a box with a note: 'Touch and feel ecstasy... or agony.' Do you open it?",
      "A shadow figure stands at your door. It looks like you — but hotter.",
      "Every time you say the word 'ghost', your clothes feel tighter.",
      "You're given a spell to summon someone dead — who do you choose and why?",
      "You’re stuck in a time loop. Each time, something more erotic happens in the dark.",
      "You're dared to seduce a ghost to learn its name.",
      "The bed starts shaking violently. You’re alone. Or are you?",
      "You receive a text: 'I'm under your bed.' Do you check or flirt with it?",
      "A cursed kiss traps you in the body of the last person you kissed.",
      "Your reflection starts stripping while you’re fully clothed.",
      "A ghost writes something on your mirror in steam. What does it say?",
      "You're in the shower and a second pair of hands start washing you.",
      "The Ouija board spells out your kink. Everyone sees it.",
      "You're told your next scream will awaken something evil. Do you risk it?",
      "You feel a cold hand between your legs... but it's not stopping.",
      "A mysterious figure offers to haunt your dreams. The price: your real-life pleasure."
    ] },

  Extreme: {
    truths: [
      "What’s the darkest thought you’ve ever had while alone at night?",
      "Have you ever fantasized about something you know you shouldn't?",
      "What’s a secret so extreme you've never told anyone?",
      "What’s the wildest thing you’d do if there were no laws for 24 hours?",
      "Have you ever been turned on by fear?",
      "What’s the most dangerous situation you’ve secretly enjoyed?",
      "Do you have a kink you’re too afraid to try?",
      "What’s something illegal you’d do if you were guaranteed to get away with it?",
      "Have you ever desired someone forbidden to you?",
      "What’s the closest you’ve ever come to dying?",
      "Do you believe in evil? Have you seen it?",
      "What’s a lie you’ve told that changed someone’s life?",
      "Have you ever blackmailed or manipulated someone?",
      "What’s the worst thing you’ve done to someone sexually or emotionally?",
      "If you could kill someone with no consequences, who would it be and why?",
      "Have you ever stalked someone or felt obsessive about them?",
      "What’s a fetish you’ve never admitted publicly?",
      "Have you ever hurt someone just to see what it felt like?",
      "What’s something you crave that scares you?",
      "Have you ever had a supernatural experience you’re afraid to talk about?",
      "What’s your most extreme desire?",
      "Do you enjoy watching people suffer in movies or real life?",
      "Would you rather die quickly or slowly with meaning?",
      "Have you ever had a sexual fantasy involving pain?",
      "What’s something you’d do in a locked room with no cameras?",
      "If someone offered you $10M to betray your best friend, would you?",
      "Have you ever been aroused in a dangerous place?",
      "What’s your darkest online activity?",
      "Have you ever made someone cry on purpose just to feel power?",
      "What’s the scariest thing you’ve ever wanted to try?"
    ],
    dares: [
      "Look the person to your right in the eye and whisper your most twisted fantasy.",
      "Scroll to the third person on your chat list and send them: 'I want to feel you in ways I shouldn't.'",
      "Record yourself letting out a scream of pure rage and post it on your story.",
      "Send a voice note confessing a dark fake secret to someone random.",
      "Pretend to be possessed for the next 1 minute with total seriousness.",
      "Put on your most seductive expression and say 'I’m not safe for anyone tonight.'",
      "Text someone ‘I dreamt about you. You were in chains.’",
      "Take a photo with a dim red light and caption it ‘I’ve crossed the line tonight.’",
      "Let the group write one sentence on your social media bio for 10 minutes.",
      "Act like a serial killer explaining your method for 1 minute straight.",
      "Whisper a scary secret you made up into the nearest person’s ear.",
      "Scream a sexual fantasy out loud like you’re confessing",
      "Take off one piece of clothing for the next 2 rounds (keep it appropriate).",
      "Send ‘Can I tell you something crazy? I saw your face in a dream, covered in blood.’ to a crush.",
      "Act out your deepest desire in mime form.",
      "Record a demonic laugh and send it to your last contact.",
      "Stand in a dark room with no light for 1 minute — no talking.",
      "Hold intense eye contact with someone while breathing heavily.",
      "Let someone from the group write a single dirty word on your arm.",
      "Crawl like a creature toward the group while saying something seductive.",
      "Write 'I'm watching you' on your window and take a photo.",
      "Change your phone wallpaper to something cursed or disturbing.",
      "Let another player dare you to do something in private chat — no refusal.",
      "Call someone and say ‘I can’t sleep because I hear whispers about you.’",
      "Draw a fake sigil on your hand and act like it's taking control of you.",
      "Send your friend ‘I just remembered your scent. It still lingers.’",
      "Draw a heart with a knife (safe prop) on your palm and say 'It’s for them.'",
      "Make your sexiest face and whisper ‘Do you think I’m evil?’",
      "Let someone else pick a name and call you that for the rest of the game.",
      "Write a flirty but creepy text to a stranger you barely talk to."
    ],
    situations: [
      "You're trapped in a dark elevator with someone you secretly desire. The lights flicker. A voice says: 'Only one gets out unless you confess something disturbing.' What do you say?",
      "You wake up handcuffed to your enemy. You both remember nothing. There’s a knife on the table. What's your move?",
      "You get a text from a number you don’t know. It says: 'You looked good bleeding last night.' What do you do?",
      "You're at a party. Someone pulls you into a closet and kisses you. They vanish. A note appears: 'Wrong timeline. Don't chase me.' What happens next?",
      "You find a hidden camera in your room with a note: 'Keep performing. We're watching.' How do you react?",
      "You’re dared to call a crush and confess something unholy — what do you say?",
      "You enter a room full of mirrors. In one, your reflection smirks while the others look normal. It mouths something — what do you see?",
      "You wake up in a stranger’s bed with a note saying 'You begged me not to stop.' No one’s around. What do you do?",
      "You're playing Truth or Dare, and someone whispers a truth in your ear that changes your life. What did they say?",
      "You're locked in a haunted room for 30 minutes. Suddenly, a hand caresses your back. You turn — no one's there. What's your first thought?",
      "The person you trust the most tells you they made a deal with the devil for you. What was the price?",
      "You’re told you have 1 hour to live. You can confess to one person. What do you tell them?",
      "A masked stranger says you can have your fantasy, but it comes with a permanent scar. Do you accept?",
      "You hear moaning in the next room — but you live alone. What do you do?",
      "You get a letter that says ‘Your true self awakens at 3:33 AM. Don’t resist it.’ What happens that night?",
      "You’re dared to spend a night in a haunted asylum with someone you’re attracted to. What unfolds?",
      "Your favorite person kisses you, then says 'This never happened' and walks away into the dark. What do you do?",
      "You find a journal with your name in it — it describes things you haven’t done yet. One entry is tonight. What does it say?",
      "You're at a sleepover. Everyone is asleep. You hear your name whispered seductively in your ear. No one is there. What happens next?",
      "You're in a dark forest. A voice says: ‘Confess your sin or stay lost forever.’ What do you say?",
      "You wake up in a bath full of rose petals and blood. There's a note: 'You were beautiful.' What's your reaction?",
      "Someone dares you to show your ‘darkest side’ for 5 minutes. What do you do?",
      "You're sent a photo of yourself sleeping from last night. You're sure you were alone. What now?",
      "You’re dared to whisper your filthiest fantasy to the person you least expect. Who is it and what do you say?",
      "Someone you desire kisses you. You feel pain. They whisper 'Now you belong to me.' What do you do?",
      "You see a version of yourself in the mirror with glowing eyes, mouthing ‘Soon.’ What happens?",
      "You're alone. You hear a voice say 'It’s time to feel everything you’ve repressed.' What do you experience?",
      "Your crush is chained and blindfolded. You hold the key. They say, ‘Do your worst.’ What happens next?",
      "You're in a game. The only way to win is to betray someone. Who do you choose and why?",
      "You're dared to say something so twisted and seductive it makes everyone uncomfortable. What do you say?"
    ]
  },

  Haunted: {
    truths: [
      "What’s the most horrifying experience from your childhood that still haunts you?",
      "Have you ever seen something you truly couldn't explain?",
      "If a demon offered to fulfill one wish but take something in return, what would you do?",
      "What’s the scariest recurring nightmare you’ve ever had?",
      "Have you ever done something that made you feel cursed?",
      "What’s the most disturbing secret you’ve never told anyone?",
      "Have you ever felt a presence watching you in an empty room?",
      "Would you spend the night alone in a haunted asylum for $10,000?",
      "What’s the one place you swore you’d never go back to?",
      "If your reflection moved on its own, what’s the first thing you’d do?",
      "What voice would you least want to hear in the middle of the night?",
      "Have you ever seen a figure in the corner of your eye that wasn’t there?",
      "If your dreams were being watched, what would you be most afraid of people seeing?",
      "What’s something you fear will follow you even after death?",
      "Have you ever encountered a haunted object?",
      "What’s the creepiest thing you’ve ever heard whispered in your ear?",
      "Would you sacrifice someone close to you to save yourself from eternal torment?",
      "What’s the most haunted place you’ve visited?",
      "Have you ever heard a voice call your name when no one was there?",
      "If your house suddenly locked itself, how long would you survive inside?",
      "Would you rather be possessed or live in a haunted house forever?",
      "What’s a secret you’re afraid will come back to destroy you?",
      "Have you ever felt something touch you in your sleep?",
      "Would you play a cursed game if it meant you’d gain something incredible?",
      "What’s the most evil thing you think a person is capable of?",
      "Would you trade your soul for someone else's safety?",
      "What’s the worst scream you've ever heard in real life?",
      "If you had to dig up one grave tonight, whose would it be?",
      "Would you rather live one night as a ghost or be haunted for life?",
      "What's one truth you'd never want your family to know?"
    ],

    dares: [
      "Stand completely still in a dark room for 3 minutes alone.",
      "Whisper 'I invite the darkness in' three times with all lights off.",
      "Call your own number and let it ring. Don’t answer.",
      "Look into a mirror and describe what you see for 2 full minutes.",
      "Write your name backward on a wall and chant it softly.",
      "Stand in a corner and pretend you're being punished for a forgotten crime.",
      "Open a window and whisper a secret to the night.",
      "Draw a pentagram with your finger on the floor.",
      "Sit cross-legged, eyes closed, and whisper the name of someone long gone.",
      "Pretend you’re possessed for one full minute.",
      "Speak in tongues or gibberish as convincingly as possible.",
      "Slowly crawl toward the group like you’re someone else.",
      "Say your own eulogy while holding a candle.",
      "Wrap a blanket around yourself and act like a cursed soul from a past life.",
      "Scream as loud as you can as if you're being taken.",
      "Stand in silence while everyone stares at you for 60 seconds.",
      "Sing a lullaby in a creepy whisper.",
      "Laugh like a haunted doll for 20 seconds straight.",
      "Hold your breath and close your eyes while we play a random scary sound.",
      "Walk backward in a circle while repeating the last name you heard.",
      "Act like a broken animatronic until your turn ends.",
      "Knock on a wall three times and say, ‘I’m ready.’",
      "Spin in place while saying 'I see you' with eyes closed.",
      "Blindfold yourself and try to guess who is touching your shoulder.",
      "Place a chair in the middle of the room and talk to an 'imaginary' spirit.",
      "Pretend to summon someone from the dead.",
      "Keep eye contact with someone while whispering their full name eerily.",
      "Walk slowly around the room, dragging your feet like a ghost.",
      "Let someone write a disturbing word on your arm with a marker.",
      "Recite the alphabet backward while pretending something’s chasing you."
    ],

    situations: [
      "You’re locked in a room where a child’s laughter keeps echoing. You must escape before the laughter stops.",
      "Everyone hears a knock at the window… but no one is outside. What do you do?",
      "A mirror just cracked on its own. One player must stare into it and describe what they see.",
      "Your phone rings. The screen says 'Unknown'. You must answer and speak to it for 1 minute.",
      "There is a sudden blackout. You hear breathing. You must stay still for 30 seconds.",
      "A player hears their name whispered. No one claims it. Who did it?",
      "An old recording plays of your own voice—but you never made it. What’s on the tape?",
      "Everyone must stay silent as one player slowly walks around with a candle.",
      "The room is cursed. To break the curse, you must reveal a dark memory.",
      "You wake up in a coffin with only a flashlight. How do you escape?",
      "Someone from the past returns and wants vengeance. Who is it and why you?",
      "You’ve been marked. Show the mark (invent one). What does it mean?",
      "Everyone sees a shadow move but you’re the only one who can hear it talk.",
      "The lights flicker and a doll appears in the center of the room. Who brought it?",
      "Each of you is being watched by something unseen. You must act normal.",
      "You hear footsteps behind you but you're frozen. Describe what happens next.",
      "A voice says: 'Choose who dies next.' You must point at someone—no backing out.",
      "You have 60 seconds to confess something unforgivable before it comes.",
      "There’s something in the room that doesn’t belong. What is it?",
      "Everyone gets one minute to say goodbye like it’s the end of the world.",
      "The floor turns cold and wet like a swamp. What’s crawling up?",
      "A ghost will haunt the last person to blink. No blinking until someone breaks.",
      "Everyone chooses someone to 'sacrifice.' The group must agree or face the consequences.",
      "You’re now mute and can only communicate with gestures. Someone must understand you.",
      "Describe your worst fear coming to life—convincingly.",
      "A candle goes out. That means one spirit has entered the room. Who does it possess?",
      "You must describe how each person here dies—creatively and scarily.",
      "The door slams shut. The spirit has chosen someone to stay behind. Who is it?",
      "You all hear a ticking clock. What happens when it strikes midnight?",
      "You find an old journal with your name in it. The last page is today’s date."
    ]
  },

  Nightmare: {
    truths: [
      "Have you ever seen a shadow move that wasn't yours?",
      "Would you sacrifice someone to save yourself?",
      "What's the most disturbing dream you've ever had?",
      "Have you ever heard voices calling your name when no one's around?",
      "Do you believe you're being watched right now?",
      "What’s something you’ve done that still haunts you in silence?",
      "Have you ever felt a presence behind you while alone?",
      "If a demon offered to make your life perfect, would you accept?",
      "What’s one thing you would never tell your parents about your past?",
      "Have you ever wished someone dead and regretted it?",
      "When was the last time you cried out of sheer fear?",
      "If you were possessed, how would we know?",
      "What’s a sin you’d commit again if given the chance?",
      "Have you ever hurt an animal intentionally?",
      "What do you think happens when we die—honestly?",
      "Do you have a reoccurring nightmare?",
      "What’s the most haunted place you’ve been to?",
      "Have you ever touched a Ouija board?",
      "Do you think you have darkness inside you?",
      "Who would you drag to hell with you if forced?",
      "Have you ever seen something your brain refused to explain?",
      "Would you betray {name} if it meant you’d be spared?",
      "Have you ever done a ritual alone?",
      "When was the first time you truly felt unsafe?",
      "If a ghost stood behind you right now, would you turn around?",
      "Do you talk to yourself out loud at night?",
      "What’s something you’ve hidden that would change everything?",
      "Would you kill to protect a secret?",
      "Have you ever felt like you were someone else for a moment?",
      "What's your worst intrusive thought that came true?"
    ],
    dares: [
      "Look at yourself in a mirror in the dark and whisper 'I'm not alone' 10 times.",
      "Walk to the darkest part of the house and sit there for 60 seconds in silence.",
      "Open the window and whisper 'Take me instead' three times.",
      "Text someone 'They’re coming' with no context.",
      "Turn off all the lights and read a random page of a horror story aloud.",
      "Pretend you're possessed for 1 full minute. Don’t break character.",
      "Stand behind {name} and breathe heavily for 30 seconds.",
      "Whisper your biggest fear into the dark.",
      "Draw a symbol that feels wrong and wear it for the next round.",
      "Tie a cloth around your eyes and sit still for 2 minutes.",
      "Leave a door in the house slightly open. Do not close it until the game ends.",
      "Crawl under the table and whisper everything you hear for 1 minute.",
      "Tap on the wall 3 times and say 'I know you're there.'",
      "Take a selfie with flash in the darkest room.",
      "Repeat this phrase 10 times: 'The door opens when I sleep.'",
      "Record yourself chanting something demonic-sounding and play it back.",
      "Write 'They are watching' on a mirror and leave it there.",
      "Laugh like a maniac until someone asks you to stop.",
      "Call out to a ghost by name and ask it to show a sign.",
      "Wear a blanket like a cloak and stare at the wall for 2 minutes.",
      "Shut off the main light and only use flickering light or candle until your next turn.",
      "Don’t speak for the next 5 minutes, only stare.",
      "Scratch your name onto something nearby.",
      "Knock on the floor 6 times slowly and whisper 'Awaken.'",
      "Say the full name of a dead relative and then 'Are you still here?'",
      "Choose a random player and whisper a fake prophecy to them.",
      "Turn your back to the group and say what you'd want them to say at your funeral.",
      "Stand still with your head down and arms hanging for 60 seconds.",
      "Whisper into someone’s ear: 'I’m not who you think I am.'",
      "Send a voice message to a friend saying 'It's started.'"
    ],
    situations: [
      "You're trapped in a house with a ticking clock that counts down to midnight. If the spirit isn’t found before then, someone disappears.",
      "Everyone must whisper for the next round. Loud sounds invite 'it'.",
      "A player suddenly starts acting possessed. They choose the next victim.",
      "A mirror appears with words written backwards. One must read it aloud to continue.",
      "You all hear a thud. One must go investigate alone.",
      "A ritual requires a circle. Form one and don’t break it—no matter what.",
      "Someone hears their name whispered from the shadows. Who was it?",
      "The lights go out. One player must guide the rest while blindfolded.",
      "An object has been cursed. Whoever touches it is now marked.",
      "You're in a séance. Choose a spirit to contact.",
      "There’s someone hiding in the room—but only one player can see them.",
      "Your phone buzzes. It's a message from someone who died last year.",
      "Pick a player to leave the room for 2 minutes. When they return, don't explain what changed.",
      "The spirit demands a sacrifice—one player must be silenced for 3 rounds.",
      "Something was just taken from you. What was it? (Answer aloud.)",
      "The TV turns on by itself. Describe what you see in horrifying detail.",
      "You're in a dream where nothing is real. Convince someone else of it.",
      "One of you is already dead. Decide who.",
      "A scream echoes. You must all freeze. First to move is possessed.",
      "You have to chant a phrase together. The last to finish becomes cursed.",
      "A red string connects two of you. Only one can speak each round.",
      "The door creaks. One of you must walk to it slowly and knock once.",
      "You’ve been chosen to become the vessel. Take on a creepy new personality.",
      "There's a spirit mimicking your voice. Prove you are the real you.",
      "The room is colder now. Say who you think brought the spirit in.",
      "You hear breathing behind you. Do not turn around.",
      "You find an old photo—everyone must guess whose memory it’s from.",
      "You wake up in a coffin. Describe your panic as the others watch.",
      "Everyone must hold hands. Break the chain, and someone disappears.",
      "You are now the spirit. Choose your victim and mark them quietly."
    ]
  }

};


const modes = [
  { name: 'Family', image: '/images/family.jpg' },
  { name: 'Fun', image: '/images/fun.jpg' },
  { name: 'Crazy', image: '/images/crazy.jpg' },
  { name: 'Extreme', image: '/images/extreme.jpg' },
  { name: 'Haunted', image: '/images/haunted.jpg' },
  { name: 'Nightmare', image: '/images/nightmare.jpg' },
];

export default function Game() {

  const navigate = useNavigate();
  const location = useLocation();
  const { Players = [], mode = "default" } = location.state || {};

  const [players, setPlayers] = useState(Players);
  const [gameState, setGameState] = useState(0); // 0 = Start, 1 = Player Picked, 2 = Prompt Given
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [titleText, setTitleText] = useState("Welcome to TDS-GHOST");
  const [captionText, setCaptionText] = useState("Please use dekstop mode on phones");

  const [button1, setButton1] = useState("Start Game");
  const [button2, setButton2] = useState("");
  const [button3, setButton3] = useState("");

  const pickRandomPlayer = () => {
    if (!players.length) return null;
    return players[Math.floor(Math.random() * players.length)];
  };

  const resetButtons = () => {
    setButton1("");
    setButton2("");
    setButton3("");
  };

  const handleStart = () => {
    setGameState(1);
    setTitleText("SPIRIT");
    setCaptionText("The Spirits are choosing...");
    resetButtons();

    setTimeout(() => {
      const player = pickRandomPlayer();
      if (!player) return;

      setSelectedPlayer(player);
      setTitleText(player.name);
      setCaptionText("What do you choose?");
      setButton1("Truth");
      setButton2("Dare");
      setButton3("Situation");
    }, 2000);
  };

  const handlePrompt = (type) => {
    if (!selectedPlayer) return;

    const randomName = pickRandomPlayer()?.name || "someone";
    let promptText = "";
if (type === "truth") {
  const randomIndex = Math.floor(Math.random() * prompts[mode].truths.length);
  promptText = prompts[mode].truths[randomIndex]?.replace("{name}", randomName);
} else if (type === "dare") {
  const randomIndex = Math.floor(Math.random() * prompts[mode].dares.length);
  promptText = prompts[mode].dares[randomIndex]?.replace("{name}", randomName);
} else if (type === "situation") {
  const randomIndex = Math.floor(Math.random() * prompts[mode].situations.length);
  promptText = prompts[mode].situations[randomIndex]?.replace("{name}", randomName);
}

    setCaptionText(promptText || "No prompt available.");

    setGameState(2);
    setButton1("Complete");
    setButton2("Forfeit");
    setButton3("");
  };

  const handleComplete = () => {
    setTitleText("Well Done!");
    setCaptionText("Ready for another round?");
    setGameState(0);
    setSelectedPlayer(null);
    setButton1("Conjure Again");
    setButton2("");
    setButton3("");
  };

const handleForfeit = async () => {
  if (!selectedPlayer) return;

  setTitleText(`${selectedPlayer.name} has forfeited!`);
  setCaptionText("Checking for spirits nearby...");
  setButton1("");
  setButton2("");
  setButton3("");

  phonepull();
  const result = await activateRadar(); // ✅ now you get the actual value

  const updatedPlayers = players
    .map((p) =>
      p.name === selectedPlayer.name
        ? { ...p, hearts: p.hearts - (result ? 2 : 1) }
        : p
    )
    .filter((p) => p.hearts > 0);

  setPlayers(updatedPlayers);

  if (result) {
    setTitleText(`${selectedPlayer.name} lost two hearts!`);
    setCaptionText("A spirit has blocked the player. They lose two lives!");
  } else {
    setTitleText(`${selectedPlayer.name} lost a heart!`);
    setCaptionText("No spirits nearby. They lose a single life.");
  }

  setSelectedPlayer(null);

  setTimeout(() => {
    setGameState(0);
    setButton1("Conjure Again");
    setButton2("");
    setButton3("");
  }, 2000);
};


  // Main button handler
  const handleButton1 = () => {
    clicksound();
    if (gameState === 0) handleStart();
    else if (gameState === 1) handlePrompt("truth");
    else if (gameState === 2) handleComplete();
  };

  const handleButton2 = () => {
    clicksound();
    if (gameState === 1) handlePrompt("dare");
    else if (gameState === 2) handleForfeit();
  };

  const handleButton3 = () => {
    clicksound();
    if (gameState === 1) handlePrompt("situation");
  };

  
  const clicksound = () => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/click.mp3`);
    audio.play();
  };

  const phonepull = () => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/phonepull.ogg`);
    audio.play();
  };

  const [showRadar, setShowRadar] = useState(false);
  const [result, setResult] = useState(0);
  const [shake, setShake] = useState(false);
  const [showGhost, setShowGhost] = useState(false);
  const [radardisplaytext, setradardisplaytext] = useState(false);
const activateRadar = () => {
  return new Promise((resolve) => {
    setShowRadar(true);
    setShake(false);
    setShowGhost(false);
    setradardisplaytext("Scanning for nearby spirits...");

    setTimeout(() => {
      const detected = Math.floor(Math.random() * 10) > 5;

      if (detected) {
        setShowGhost(true);
        setResult(1);
        console.log("result set to 1");
        setTimeout(() => setradardisplaytext("A nearby spirit has intervened."), 500);
        resolve(1);
      } else {
        setResult(0);
        setTimeout(() => setradardisplaytext("No spirit nearby."), 500);
        resolve(0);
      }

      setTimeout(() => {
        setShowRadar(false);
        setShake(false);
        phonepull();
      }, 2000);
    }, 4000);
  });
};



  return (
    <>
     <button 
            onClick={() => {clicksound(), navigate(-1)}}
            className="absolute top-2 left-2
            hover:bg-red-800/20 rounded-full p-2
            transition-all duration-500 ease-in-out
            flex space-x-2 items-center z-1
            ">
                <ArrowLeft className="text-red-800"/>
                <p className="text-xl bg-gradient-to-b
                from-white/90 to-red-500/80 bg-clip-text
                text-transparent border-b-0 border-red-500/20"
                style={{ fontFamily:"Creepster"}}
                >Afraid?</p>
            </button>

    <PlayerList
      players={players}
      TitleText={titleText}
      CaptionText={captionText}
      Button1={button1}
      Button2={button2}
      Button3={button3}
      onclickbutton1={handleButton1}
      onclickbutton2={handleButton2}
      onclickbutton3={handleButton3}
    />


      
      <AnimatePresence>
        {showRadar && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay:1 }}
            className={`fixed bottom-2 right-2 w-full h-full sm:w-[280px] sm:h-[500px] bg-black/20 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none z-50 font-mono tracking-wider flex flex-col items-center justify-center p-4 sm:p-0 sm:items-center sm:justify-center sm:rounded-[2.5rem] sm:border-[10px] sm:border-gray-900 sm:shadow-2xl sm:overflow-hidden sm:bg-black ${
              shake ? 'animate-shake' : ''
            }`}
          >
            {/* Phone Notch for mockup look */}
            <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-700 rounded-b-3xl z-20"></div>

            {/* Phone screen content */}
            <div className="w-full h-full bg-black flex flex-col items-center justify-center px-4 py-6 relative z-10">
              <div
                className="glitch text-2xl sm:text-xl font-bold mb-4 text-green-300"
                style={{ fontFamily: 'Creepster' }}
              >
                RADAR ONLINE...
              </div>

              {/* Animated Radar */}
              <div className="relative w-60 h-60 sm:w-52 sm:h-52 rounded-full bg-black border-4 border-green-500 shadow-inner overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-green-400 opacity-20 animate-radarPing"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
                <div className="absolute inset-0 rounded-full border border-green-300 blur-sm shadow-lg"></div>
                <div className="absolute w-1 h-1 bg-green-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>

              <p
                className="mt-6 text-sm sm:text-lg text-green-400 glitch"
                style={{ fontFamily: 'Pirata One' }}
              >
                {radardisplaytext}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>




    </>
  );
}
