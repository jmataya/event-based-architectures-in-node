# Docker

The Docker Compose configuration in this folder is a fork of the Kafka single
node example found in Confluent's 
[confluentinc/cp-docker-images](https://github.com/confluentinc/cp-docker-images)
repository.

Images in Confluent's repository are **not** tested to work on Mac OSX or
Windows, and subsequently have problems with the way Docker host networking
differs between Linux and other platforms.

This configuration has been specifically tested with Mac OSX in mind. It may
also work on Windows and Linux.

## Usage

### Install Docker Compose

The two images that make up this simple cluster are orchestrated through
`docker-compose`. The easiest way to do this is to install Docker for Mac.
Get it from the
[Docker Store](https://store.docker.com/editions/community/docker-ce-desktop-mac).

### Launch the Images

Navigate to this directory in a terminal, then launch the images in a detached
state with the command `docker-compose up -d`. You should see the following
output:

```shell
$ docker-compose up -d
Creating network "docker_default" with the default driver
Creating docker_zookeeper_1 ... done
Creating docker_kafka_1     ... done
```

### Ensure the Images are Healthy

First, check to see that Zookeeper is up and bound correctly:

```shell
$ docker-compose logs zookeeper | grep -i binding
```

You should get output similar to the following:

```shell
zookeeper_1  | [2018-07-10 16:41:56,711] INFO binding to port 0.0.0.0/0.0.0.0:32181 (org.apache.zookeeper.server.NIOServerCnxnFactory)
```

Next, check to make sure Kafka has started correctly:

```shell
$ docker-compose logs kafka | grep -i started
```

You should get output similar to the following:

```shell
kafka_1      | [2018-07-10 16:41:59,086] INFO [SocketServer brokerId=1] Started 1 acceptor threads (kafka.network.SocketServer)
kafka_1      | [2018-07-10 16:41:59,260] INFO [SocketServer brokerId=1] Started processors for 1 acceptors (kafka.network.SocketServer)
kafka_1      | [2018-07-10 16:41:59,262] INFO [KafkaServer id=1] started (kafka.server.KafkaServer)
kafka_1      | [2018-07-10 16:41:59,266] INFO [ReplicaStateMachine controllerId=1] Started replica state machine with initial state -> Map() (kafka.controller.ReplicaStateMachine)
kafka_1      | [2018-07-10 16:41:59,269] INFO [PartitionStateMachine controllerId=1] Started partition state machine with initial state -> Map() (kafka.controller.PartitionStateMachine)
```

### Test Out Producing and Consuming

Let's create a simple topic, then produce and consume a couple messages to make
sure that everything is working.

#### Create a Topic

To get started, we'll create a topic called "foo":

```shell
$ docker-compose exec kafka \
kafka-topics --create --topic foo --partitions 1 --replication-factor 1 --if-not-exists --zookeeper zookeeper:32181
```

You should see the output:

```
Created topic "foo".
```

#### Produce Messages

Use the `kafka-console-producer` to create a sequence of simple messages.

```
$ docker-compose exec kafka \
bash -c "seq 42 | kafka-console-producer --request-required-acks 1 --broker-list localhost:29092 --topic foo && echo 'Produced 42 messages.'"
```

You should see output similar to:

```
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Produced 42 messages.
```

#### Consume Messages

Now, use the `kafka-console-consumer` to consume those messages.

```
$ docker-compose exec kafka \
kafka-console-consumer --bootstrap-server localhost:29092 --topic foo --from-beginning --max-messages 42
```

It may take a few seconds to get started, but then you should see the following output:

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
Processed a total of 42 messages
```
