import { useState } from "react";

import "./App.css";

import "./scss/styles.scss";

// SVG images
import deleteIcon from "./assets/delete-svgrepo-com.svg";
import updateIcon from "./assets/pencil-svgrepo-com.svg";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { Col, Container, Row } from "react-bootstrap";

import { splitPlayersIntoTeams } from "./logic.ts";

export interface Player {
  id: number;
  name: string;
  level: number;
}

interface Teams {
  teamA: Player[];
  teamB: Player[];
  totalLevelA: number;
  totalLevelB: number;
}

const dummy: Player[] = [
  { id: 100, name: "Player 1", level: 3 },
  { id: 101, name: "Player 2", level: 5 },
  { id: 102, name: "Player 3", level: 2 },
  { id: 103, name: "Player 4", level: 4 },
  { id: 104, name: "Player 5", level: 1 },
  { id: 105, name: "Player 6", level: 3 },
  { id: 106, name: "Player 7", level: 5 },
  { id: 107, name: "Player 8", level: 2 },
  { id: 108, name: "Player 9", level: 4 },
  { id: 109, name: "Player 10", level: 1 },
  { id: 110, name: "Player 11", level: 3 },
  { id: 111, name: "Player 12", level: 5 },
  { id: 112, name: "Player 13", level: 2 },
  { id: 113, name: "Player 14", level: 4 },
];

function App() {
  // Alert
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => handleCloseAlert(), 2000);
  };

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setplayerName("");
    setplayerLevel(1);
    setEditingPlayerId(0);
  };
  const handleShow = () => setShow(true);

  // Data logic
  const [currentId, setCurrentId] = useState(100);

  // const [players, setPlayers] = useState<Player[]>([]);
  const [players, setPlayers] = useState<Player[]>(dummy);

  const [playerName, setplayerName] = useState<string>("");
  const [playerLevel, setplayerLevel] = useState<number>(1);

  const [editingPlayerId, setEditingPlayerId] = useState<number>(0);

  const [teams, setTeams] = useState<Teams>();

  const addPlayer = (newPlayerName: string, newPlayerLevel: number) => {
    if (newPlayerName == "" || newPlayerLevel == 0) {
      handleShowAlert();
      return;
    }

    const newPlayer: Player = {
      id: currentId,
      name: newPlayerName,
      level: newPlayerLevel,
    };

    players === undefined || players.length == 0
      ? setPlayers(() => [newPlayer])
      : setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);

    handleClose();
    setCurrentId(() => currentId + 1);
  };

  const deletePlayer = (idToDelete: number) => {
    const updatedPlayers = players.filter((player) => player.id !== idToDelete);
    setPlayers(updatedPlayers);
  };

  const playerToBeUpdated = (idToUpdate: number) => {
    const playerToUpdate = players.find((player) => player.id === idToUpdate);
    if (!playerToUpdate) return;

    const { name = "", level = 1 } = playerToUpdate;

    setplayerName(name);
    setplayerLevel(level);
    setEditingPlayerId(playerToUpdate.id);
    handleShow();
  };

  const updatePlayer = () => {
    if (editingPlayerId === 0) return;

    if (playerName == "" || playerLevel == 0) {
      handleShowAlert();
      return;
    }

    const updatedPlayers = players.map((e) =>
      e.id === editingPlayerId
        ? { ...e, name: playerName, level: playerLevel }
        : e
    );

    setPlayers(updatedPlayers);
    handleClose();
  };

  const generateTeams = () => {
    const newTeams = splitPlayersIntoTeams(players);
    setTeams(newTeams);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="primary" className="mx-2" onClick={handleShow}>
              Add player
            </Button>
            <Button variant="success" className="mx-2" onClick={generateTeams}>
              Generate teams
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup className="my-4">
              {players.map((player) => (
                <ListGroup.Item key={player.id}>
                  <Container fluid>
                    <Row className="align-items-center" style={{flexWrap:"nowrap"}}>
                      <Col>{player.id}</Col>
                      <Col style={{flexBasis: "fit-content"}}>{player.name}</Col>
                      <Col>{player.level}</Col>
                      <Col className="d-flex gap-2">
                        <Button className="d-inline-block" onClick={() => playerToBeUpdated(player.id)}>
                          <img src={updateIcon} style={{width:"15px"}} alt="Update" />
                        </Button>
                        <Button className="d-inline-block" onClick={() => deletePlayer(player.id)}>
                          <img src={deleteIcon} style={{width:"15px"}} alt="Delete" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <ListGroup className="my-4">
              <Container>
                <Row>
                  <Col>Team A</Col>
                  <Col>Team B</Col>
                </Row>
                <Row>
                  <Col>
                    {teams?.teamA?.map((e) => (
                      <Row key={e.id}>{e.name}</Row>
                    ))}
                  </Col>
                  <Col>
                    {teams?.teamB?.map((e) => (
                      <Row key={e.id}>{e.name}</Row>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col>Total Level: {teams?.totalLevelA}</Col>
                  <Col>Total Level: {teams?.totalLevelB}</Col>
                </Row>
              </Container>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert key={"danger"} variant={"danger"} show={showAlert}>
            Do not forget to enter the name of the player!
          </Alert>
          <Form>
            <Form.Group className="mb-3" controlId="controlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Joe Doe"
                autoFocus
                onChange={(e) => setplayerName(e.target.value)}
                value={playerName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="controlInput2">
              <Form.Label>Level</Form.Label>
              <Form.Range
                min={1}
                max={5}
                step={1}
                autoFocus
                onChange={(e) => {
                  setplayerLevel(Number(e.target.value));
                }}
                value={playerLevel}
              />
              <div className="d-flex justify-content-between fs-6">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editingPlayerId === 0
                ? addPlayer(playerName, playerLevel)
                : updatePlayer();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
